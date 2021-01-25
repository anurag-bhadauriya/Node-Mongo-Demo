const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true);
const url = "mongodb://localhost:27017/Policy_DB";
const POLICY_CARRIER_COLLECTION_NAME ="Policy_Carrier";
const mongooseOption = { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 25 };

const PolicyCarrierSchema = Schema({
    companyName: { type: String, unique: true}
}, { collection: POLICY_CARRIER_COLLECTION_NAME, timestamps: true })

let policyCarrierCollection ={};

policyCarrierCollection.getPolicyCarrierCollection = () => {
    return Mongoose.connect(url, mongooseOption).then((database) => {
        return database.model(POLICY_CARRIER_COLLECTION_NAME, PolicyCarrierSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = policyCarrierCollection;
