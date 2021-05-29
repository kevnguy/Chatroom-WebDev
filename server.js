// import dependencies
const express = require('express');
//const cookieParser = require('cookie-parser');
const path = require('path');
const mongojs = require('mongojs');
const db = mongojs('lab4');

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

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));