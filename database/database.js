var firebase = require('firebase');
var request = require('request');
class Database {
    constructor() {
      var config = {
          apiKey: "AIzaSyDq7bE7_SylOn17tYo2hnf9Lk5vGYK0vb4",
          authDomain: "jobqueue-3b52d.firebaseapp.com",
          databaseURL: "https://jobqueue-3b52d.firebaseio.com",
          projectId: "jobqueue-3b52d",
          storageBucket: "jobqueue-3b52d.appspot.com",
          messagingSenderId: "1009181998970"
      };

      this.database = firebase.initializeApp(config).database();
    }

    //Function used to process the queue, returns Done if the job executes successfully
    addHTMLToDatabase(urlToParse, jobID, done) {
        var database = this.database
        //Clean the url
        urlToParse = urlToParse.replace(/^\s*|\s*$/g, '');
        //Add http to the url
        if (urlToParse.indexOf('http://') !== 0) {
            urlToParse = 'http://' + urlToParse;
        }

        var options = {
            url: urlToParse,
            port: 80,
            method: 'GET'
        };

        //Issue a GET Request to the web page to parse the HTML
        request(options, function (error, response, body) {
            if (!error) {
                database.ref('/job/' + jobID).set({
                    html: body
                })
                done();
            } else {
                done(error);
            }
        });
    }
    //Function to retrieve the HTML stored in the database for a job
    retrieveHTML(jobID, callback) {
        this.database.ref('job/' + jobID).once('value').then(function(snapshot) {
            callback(snapshot.val().html);
        });
    }
}

module.exports = Database;
