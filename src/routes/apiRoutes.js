const express = require('express');
const apiRouter = express.Router();
const csv = require('csvtojson');
const path = require('path');
const { Worker, isMainThread } = require('worker_threads');
const apiService = require('../services/apiService');

//Upload CSV file to mongo using worker thread
apiRouter.post('/upload', (req, res, next)=>{
    csv().fromString(req.files.data.data.toString('utf8'))
    .then(records =>{
        var i,j,temparray,chunk = 200;
        for (i=0,j=records.length; i<j; i+=chunk) {
            temparray = records.slice(i,i+chunk);
            runWorkerService(temparray).then(data=>{
                console.log('Worker thread completed !');
            }).catch(err=>{
                console.log(err);
            });
        }
        res.json({ msg: 'This might take a while. Your data is being uploaded !!!'});
    });
});

// Upload CSV to mongodb using async method
apiRouter.post('/upload/async', async (req, res, next)=>{
    csv().fromString(req.files.data.data.toString('utf8'))
    .then(records =>{
        apiService.insertToDbUsingFile(records).then(responseMsg =>{
            res.json({ msg: responseMsg });
        })
    });
});

//Get request to get the policy info by username
apiRouter.get('/get-policy-info/:userName', (req, res, next)=>{
    let userName = req.params.userName;
    apiService.getPolicyInfoByUsername(userName).then(data =>{
        res.json(data);
    }).catch(err=>{ console.log(err)});
})

//Get request get the aggregate policy by each user
apiRouter.get('/get-aggregate-policy', (req, res, next)=>{
    apiService.getAggregatePolicyByEachUser().then(data =>{
        res.json(data);
    }).catch(err =>{ console.log(err) });
})

// Function to generate a worker_thread
async function runWorkerService(records){
    if(isMainThread){
        return new Promise((resolve, reject)=>{
            const worker = new Worker(path.join(__dirname, '../utilities/workerUtil.js'));
            worker.postMessage(records);
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code)=>{
                if(code)
                    reject(new Error('Worker thread stopped with error code:'+code));
            });
        });
    }
}

module.exports = apiRouter;