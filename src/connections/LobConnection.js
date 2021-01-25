const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true);
const url = "mongodb://localhost:27017/Policy_DB";
const LOB_COLLECTION_NAME ="LOB";
const mongooseOption = { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 25 };

const LobSchema = Schema({
    categoryName: { type: String, unique: true}
}, { collection: LOB_COLLECTION_NAME, timestamps: true })

let lobCollection ={};

lobCollection.getLobCollection = () => {
    return Mongoose.connect(url, mongooseOption).then((database) => {
        return database.model(LOB_COLLECTION_NAME, LobSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = lobCollection;
