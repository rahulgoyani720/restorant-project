const express = require("express");
const color = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const CONFIG = require("./configs/config");
const connectiondb = require("./configs/db");
const allRouter = require("./routers/router");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// DB connection
connectiondb();

//router
app.use("/api",allRouter);


app.get("/",(req,res) => {
    res.send("welcome to homepage")
})

app.listen(CONFIG.port,() => {
    console.log(`server is start in ${CONFIG.port}`.bgBlue.white);

})