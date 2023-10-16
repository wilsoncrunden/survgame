const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.use("/media", express.static("assets"));
app.use("/static", express.static("client"));
app.use(express.json());

app.use(require("./routes/register"));

app.get("/", (req, res) => {

    res.sendFile(path.resolve("./client/register/index.html"));

});

app.listen(process.env.EXPRESS_PORT, () => {

    console.log("Server running on port " + process.env.EXPRESS_PORT);

});