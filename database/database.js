
var kue = require('firebase');
var request = require('request');
class database {
    constructor() {
      this.database = database;
      this.jobs = queue;
    }


    addHTML (url) {

    }

    jobStatus (jobId, callback) {
        var state = 'invalid Id';
        console.log(jobId);
        var job = kue.Job.get(jobId, function (err, job) {
            if (err) {
              callback("Invalid ID")
            }
            console.log(job);
            callback(job._state);
        });
        if (job) {
          state = job._state;
        }
    }


}





module.exports = JobQueue;
