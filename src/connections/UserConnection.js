const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true);
const url = "mongodb://localhost:27017/Policy_DB";
const USER_COLLECTION_NAME ="User";
const mongooseOption = { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 25 };

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
}, { collection: USER_COLLECTION_NAME, timestamps: true })

let userCollection ={};

userCollection.getUserCollection = () => {
    return Mongoose.connect(url, mongooseOption).then((database) => {
        return database.model(USER_COLLECTION_NAME, UserSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = userCollection;
