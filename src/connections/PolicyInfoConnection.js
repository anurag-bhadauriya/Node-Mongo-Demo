const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true);
const url = "mongodb://localhost:27017/Policy_DB";
const POLICY_INFO_COLLECTION_NAME = "Policy_Info";
const mongooseOption = { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 25 };

const PolicyInfoSchema = Schema({
    policyNumber: String,
    policyStartDate: String,
    policyEndDate: String,
    consumer: String,
    producer: String,
    premiumAmountWritten: String,
    premiumAmount: String,
    policyMode: String,
    policyType: String,
    lobId: String,
    policyCarrierId: String,
    userId: String,
    agentId: String 
}, { collection: POLICY_INFO_COLLECTION_NAME, timestamps: true })

let policyInfoCollection ={};

policyInfoCollection.getPolicyInfoCollection = () => {
    return Mongoose.connect(url, mongooseOption).then((database) => {
        return database.model(POLICY_INFO_COLLECTION_NAME, PolicyInfoSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = policyInfoCollection;
