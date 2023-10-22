const express = require("express");
const path = require("path");
require("dotenv").config();
require("./database").keepalive();

const app = express();

// Middlewares
app.use("/media", express.static("assets"));
app.use("/static", express.static("client"));
app.use(express.json());
app.use(require("./session").parser);

// API Routes
app.use(require("./routes/register"));
app.use(require("./routes/login"));

// Static Routes
app.get("/", async (req, res) => {
    if (req.username == null) {
        res.redirect("/register");
    } else {
        res.redirect("/dash");
    }
});

app.get("/register", async (req, res) => {
    res.sendFile(path.resolve("./client/register/index.html"));
});

app.get("/login", async (req, res) => {
    res.sendFile(path.resolve("./client/login/index.html"));
});

app.get("/dash", async (req, res) => {
    if (req.username == null) {
        return res.redirect("/login");
    }
    res.sendFile(path.resolve("./client/dash/index.html"));
});

// Listening
app.listen(process.env.EXPRESS_PORT, async () => {
    console.log("Server running on port " + process.env.EXPRESS_PORT);
});