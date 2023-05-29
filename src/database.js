//Connect mongodb
const server = "mongodb://127.0.0.1:27017";
const dbname = "t2204m";
const mongoose = require("mongoose");

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(`${server}/${dbname}`)
        .then(() => {
            console.log("Connected to db");
        })
.       catch(err => {
        console.log(err);
        })
    }
}
    
module.exports = new Database();