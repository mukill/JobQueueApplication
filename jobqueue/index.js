var firebase = require("firebase");
var kue = require('kue')
var Horseman = require("node-horseman");

function JobQueue () {
    var config = {
        apiKey: "AIzaSyDq7bE7_SylOn17tYo2hnf9Lk5vGYK0vb4",
        authDomain: "jobqueue-3b52d.firebaseapp.com",
        databaseURL: "https://jobqueue-3b52d.firebaseio.com",
        projectId: "jobqueue-3b52d",
        storageBucket: "jobqueue-3b52d.appspot.com",
        messagingSenderId: "1009181998970"
      };
    firebase.initializeApp(config);
    this.database = firebase.database();
    this.jobs = kue.createQueue();
    this.horseman = new Horseman();
    this.addJob = function (url) {

    }
}
JobQueue.prototype.addJob = function (jobUrl) {
  var job = this.jobs.create('siteToCrawl', {
    url: jobUrl
  }).save();
  return job.id;
};

JobQueue.prototype.jobStatus = function (jobId) {
  var state = 'invalid Id';
  var job = kue.Job.get(jobId, fn(err, job) {
      if (err) {
        console.log("Invalid job id");
      }
  });
  if (job) {
    state = job.state;
  }
  return state;
};

module.exports = JobQueue;
