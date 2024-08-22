require("dotenv").config();

let CONFIG = {};

CONFIG.port = process.env.PORT || 2000

CONFIG.db_url = process.env.MONGO_URL || 'mongodb://localhost:27017/food_app';

CONFIG.secret_key = process.env.JWT_SECRET || "";


module.exports = CONFIG