const express = require('express');
const app = express();
const sseExpress = require('sse-express');
const template = require('./template')

const jobs = [];

app.get('/sse/:job', sseExpress, (req, res) => {
    const job = jobs.find(item => item.id == req.params.job);
    res.sse('connected', {
        message: 'hello'
    });
    if( ! job ) {
        return res.sse('error', {
            message: 'job not found'
        });
    }
    job.promise.then(data => {
        console.log('job has been completed', 'notifying client');
        res.sse('done', data);
    });
})

app.get('/', (req, res) => {
    const job = {
        id: Math.floor(Math.random() * 10000),
        status: 'pending',
        promise: new Promise((resolve => {
            setTimeout(() => resolve({
                status: 'completed',
                result: 42
            }), 5000);
        }))
    };
    jobs.push(job);
    res.send(template(job));
})

app.listen(3000, () =>
    console.log('Example app listening on port 3000!')
)