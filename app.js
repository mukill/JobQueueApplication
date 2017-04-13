var express               = require('express');
var path                  = require('path');
var JobQueue              = require('./jobqueue/queue');
var Database              = require('./database/database')
var bodyParser            = require('body-parser');
var firebase              = require("firebase");
var kue                   = require('kue');
//var parseWebsite          = require('./parseWebsite/parseWebsite');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
var PORT                       = '3000';
var HOST                       = 'http://localhost';
var jobQueue;
var database;


app.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

app.post('/addJob', function (req, res) {
    jobQueue.addJob(req.body.url, function (id, error) {
        if (error) {
            res.writeHead(404);
            res.write('ERROR, could not create job');
            res.end();
        } else {
            res.writeHead(200);
            res.write('Job id:' + id);
            res.end();
        }
    });
});

app.get('/jobStatus', function (req, res) {
    jobQueue.jobStatus(req.query.id, function (status,jobID, error) {
        if (error) {
            res.writeHead(404);
            res.write('ERROR, Invalid ID');
            res.end();
        } else {
            res.writeHead(200);
            res.write(status);
            if (status === 'complete'){
                database.retrieveHTML(jobID, function (html) {
                    res.write(html);
                    res.end();
                });
            } else {
              res.end();
            }
        }
    });
});

function beginListening() {
    database = new Database();
    var queue = kue.createQueue();
    jobQueue = new JobQueue(database, queue);
}

app.listen(PORT, function () {
    beginListening();
    var worker = kue.createQueue();
    worker.process('siteToCrawl', function (job, done) {
        database.addHTMLToDatabase(job.data.url, job.id , done);
    });
});
