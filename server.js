// import dependencies
const express = require('express');
//const cookieParser = require('cookie-parser');
const path = require('path');
const mongojs = require('mongojs');
const db = mongojs('lab4');
var jwt = require("jsonwebtoken");
const fs = require("fs");

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// set up stylesheets route

// TODO: Add server side code
db.on("error", error => {
    console.log("Database Error:", error);
});
db.on('connect', function () {
	console.log('database connected')
})
app.get("/", (req, res) =>
{
    db.chatroom.find({}, (error, data) =>
    {
        if(error)
            res.send(error);
        else
            res.send(data);
    });
});

app.post("/create", (req, res) =>
{
    db.chatroom.insert({
        name: req.body.roomName
    });

    res.send(true);
});

app.post("/insert", (req, res) =>
{
    db.messages.insert({
        user: req.body.user,
        message: req.body.message,
        room_id: req.body.roomId
    });

    res.send(true);
});

app.get("/messages/:id", (req, res) =>
{
    let roomId = req.params.id;
    db.messages.find({room_id: roomId}, (error, data) =>
    {
        if(error)
            res.send(error);
        else
            res.send(data);
    });
});

app.post("/sign-up", (req, res) =>
{
    db.users.insert({
        username: req.body.username,
        password: req.body.password
    });

    res.send(true);
});

app.get("/:username", (req, res) =>
{
    db.users.find({username: req.params.username}, (error, data) =>
    {
        if(error)
            res.send(error);
        else
        {
            if(data.length > 0)
            {
                res.send(true);
            }

            else
            {
                res.send(false);
            }
        }
    });
});

app.post("/login", (req, res) =>
{
    const privateKey = fs.readFileSync("./private.key", "utf8");
    console.log("here");
    db.users.find({username: req.body.username, password: req.body.password}, (error, data) =>
    {
        if(error)
            res.send(error);
        else
        {
            console.log(data);
            if(data.length > 0)
            {
                let jwtBearerToken = jwt.sign({}, privateKey, {
                    algorithm: "RS256",
                    expiresIn: '1hr',
                    subject: req.body.username
                });

                let token = {
                    idToken: jwtBearerToken
                }

                res.json(token);
            }

            else
            {
                res.json(false);
            }
        }
    });
});

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));