const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.static(__dirname + "/public/"));

app.get("", (req, res) => {
    res.sendFile(__dirname + "/public/" + "index.html");
});

app.get("/dev", (req, res) => {
    res.sendFile(__dirname + "/public/" + "dev.html");
});

app.get("/data", (req, res) => {
    res.json(JSON.parse(fs.readFileSync("./data.json")));;
});

app.listen(3000, console.log("Server started."));