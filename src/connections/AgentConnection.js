const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true);
const url = "mongodb://localhost:27017/Policy_DB";
const AGENT_COLLECTION_NAME = "Agent";
const mongooseOption = { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 25 };

const AgentSchema = Schema({
    agentName: { type: String, unique: true}
}, { collection: AGENT_COLLECTION_NAME , timestamps: true })

let agentCollection ={};

agentCollection.getAgentCollection = () => {
    return Mongoose.connect(url, mongooseOption).then((database) => {
        return database.model(AGENT_COLLECTION_NAME, AgentSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = agentCollection;
