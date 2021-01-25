const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true);
const url = "mongodb://localhost:27017/Policy_DB";
const USER_ACCOUNT_COLLECTION_NAME ="User_Account";
const mongooseOption = { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 25 };

const UserAccountSchema = Schema({
    accountName: String,
    accountType: String
}, { collection: USER_ACCOUNT_COLLECTION_NAME, timestamps: true })

let userAccountCollection ={};

userAccountCollection.getUserAccountCollection = () => {
    return Mongoose.connect(url, mongooseOption).then((database) => {
        return database.model(USER_ACCOUNT_COLLECTION_NAME, UserAccountSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = userAccountCollection;
