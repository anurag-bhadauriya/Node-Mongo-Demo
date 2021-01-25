const { parentPort, isMainThread } = require('worker_threads');
const apiService = require('../services/apiService');

if(!isMainThread){
    parentPort.on('message', (records)=>{
        apiService.insertToDbUsingFile(records);
        parentPort.postMessage({ status: 'Done'});
    });
}
