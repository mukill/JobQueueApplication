# JobQueue Application

## Description
This is the source code for an express application that exposes a REST API to add jobs to a queue and check their status

## To Run
To run for the first time, run `npm install`
Additionally, make sure that you have redis installed. If you have redis installed,
simply run `redis-server` then `node app.js` after redis is running.
The application's default port is `Port 3000`

## JSON API

### POST /addJob

Create a job:

    $ curl -H "Content-Type: application/json" -X POST -d \
        '{
           "url": "www.google.com"
         }' http://localhost:3000/addJob
    {"message": "Job Created", "jobID": 3}

### GET /jobStatus/:id

Get a job by `:id`:

    $ curl -H "Content-Type: application/json" -X GET http://localhost:3000/jobStatus?id=1

    {"jobID":"1", "jobStatus":"complete", "parsedHTML":'html'}
