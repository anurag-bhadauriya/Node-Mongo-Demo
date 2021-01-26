const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true);
// MongoDB URL
const url = "mongodb://localhost:27017/Policy_DB";
const mongooseOption = { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 25 };
// Collection names
const AGENT_COLLECTION_NAME = "Agent";
const USER_ACCOUNT_COLLECTION_NAME ="User_Account";
const USER_COLLECTION_NAME ="User";
const LOB_COLLECTION_NAME ="LOB";
const POLICY_CARRIER_COLLECTION_NAME ="Policy_Carrier";
const POLICY_INFO_COLLECTION_NAME = "Policy_Info";

//Collection schemas
const AgentSchema = Schema({
    agentName: { type: String, unique: true}
}, { collection: AGENT_COLLECTION_NAME , timestamps: true });

const UserAccountSchema = Schema({
    accountName: String,
    accountType: String
}, { collection: USER_ACCOUNT_COLLECTION_NAME, timestamps: true });

const UserSchema = Schema({
    firstName: String,
    dob: String,
    address: String,
    phone: String,
    state: String,
    city: String,
    zip: String,
    email: String,
    gender: String,
    userType: String,
    userAccountId: String
}, { collection: USER_COLLECTION_NAME, timestamps: true });

const LobSchema = Schema({
    categoryName: { type: String, unique: true}
}, { collection: LOB_COLLECTION_NAME, timestamps: true });

const PolicyCarrierSchema = Schema({
    companyName: { type: String, unique: true}
}, { collection: POLICY_CARRIER_COLLECTION_NAME, timestamps: true });

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
}, { collection: POLICY_INFO_COLLECTION_NAME, timestamps: true });

let dbConnection ={};

dbConnection.getAgentCollection = () => {
    return Mongoose.connect(url, mongooseOption).then((database) => {
        return database.model(AGENT_COLLECTION_NAME, AgentSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

dbConnection.getUserAccountCollection = () => {
    return Mongoose.connect(url, mongooseOption).then((database) => {
        return database.model(USER_ACCOUNT_COLLECTION_NAME, UserAccountSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

dbConnection.getUserCollection = () => {
    return Mongoose.connect(url, mongooseOption).then((database) => {
        return database.model(USER_COLLECTION_NAME, UserSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

dbConnection.getLobCollection = () => {
    return Mongoose.connect(url, mongooseOption).then((database) => {
        return database.model(LOB_COLLECTION_NAME, LobSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

dbConnection.getPolicyCarrierCollection = () => {
    return Mongoose.connect(url, mongooseOption).then((database) => {
        return database.model(POLICY_CARRIER_COLLECTION_NAME, PolicyCarrierSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

dbConnection.getPolicyInfoCollection = () => {
    return Mongoose.connect(url, mongooseOption).then((database) => {
        return database.model(POLICY_INFO_COLLECTION_NAME, PolicyInfoSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = dbConnection;
