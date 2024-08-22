const mongoose = require("mongoose");
const colors = require("colors");
const CONFIG = require("./config");

// MongoDB database connection
const connectiondb = async () => {
    try {
        await mongoose.connect(CONFIG.db_url);
        console.log(`Connection to database successful on host ${mongoose.connection.host}`.bgGreen);
    } catch (error) {
        console.error("DB connection error:".bgRed.white,error);
    }
};

module.exports = connectiondb;
