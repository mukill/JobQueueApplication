var kue = require('kue')

class JobQueue {
    constructor(database, queue) {
        this.database = database;
        this.jobs = queue;
    }

    //Function to add a job to the jobqueue
    addJob (jobUrl, callback) {
        var job = this.jobs.create('siteToCrawl', {
            url: jobUrl,
        }).save(function(err) {
            if (!err){
                callback(job.id, null);
            } else {
                callback(null, err);
            }
        });
    }

    //Function to check the status of a job in the jobqueue.
    jobStatus (jobID, callback) {
        var job = kue.Job.get(jobID, function (err, job) {
            if (err) {
                callback("Invalid ID", null, err);
            } else {
                callback(job._state, jobID, null);
            }
        });
    }
}

module.exports = JobQueue;
