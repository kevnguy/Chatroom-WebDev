// import dependencies
const express = require('express');
//const cookieParser = require('cookie-parser');
const path = require('path');
const mongojs = require('mongojs');
const db = mongojs('lab4');
var jwt = require("jsonwebtoken");
const fs = require("fs");
var ObjectId = require("mongojs").ObjectId;

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Expose-Headers', 'Authorization');
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
    const publicKey = fs.readFileSync("./public.key", "utf8");
    let token = req.headers.authorization;
    let verified = jwt.verify(token, publicKey);
    if(verified){
        db.messages.insert({
            user: verified.sub,
            message: req.body.message,
            room_id: req.body.roomId,
            created_at: req.body.created_at,
        });
    }
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

app.get("/user", (req, res) =>
{
    const publicKey = fs.readFileSync("./public.key", "utf8");
    let token = req.headers.authorization;
    let verified = jwt.verify(token, publicKey);
    if(verified) {
        db.users.find({username: verified.sub}, (error, data) => {
            if(error) {
                res.send(error) ;
            } else {
                res.send(data);    
                //console.log(data);
            }
        })
    }

});

app.post("/sign-up", (req, res) =>
{
    db.users.insert({
        name : req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    //console.log(req.body);
    res.send(true);
});

app.get("/api/:username", (req, res) =>
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
    //console.log("here");
    db.users.find({username: req.body.username, password: req.body.password}, (error, data) =>
    {
        if(error)
            res.send(error);
        else
        {
            //console.log(data);
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


app.post("/user-description", (req, res) =>
{
    const publicKey = fs.readFileSync("./public.key", "utf8");
    let token = req.headers.authorization;
    let verified = jwt.verify(token, publicKey);
    //console.log(verified);
    if(verified){
        db.userDescriptions.insert({
            userID : req.body.userID,
            description: req.body.description,
        })
        res.send(true);
    }
});

app.get("/user-description/:id", (req, res) =>
{
    const publicKey = fs.readFileSync("./public.key", "utf8");
    let token = req.headers.authorization;
    let verified = jwt.verify(token, publicKey);

    //console.log(req.params.id);
    if(verified){
        db.userDescriptions.find({userID: req.params.id}, (error, data) => {
            if(error) {
                res.send(error) ;
            } else {
                res.send(data);    
                //console.log(data);
            }
        });
    }
});

app.put("/user-description", (req, res) =>
{
    const publicKey = fs.readFileSync("./public.key", "utf8");
    let token = req.headers.authorization;
    let verified = jwt.verify(token, publicKey);

    if(verified)
    {
        db.userDescriptions.updateOne({userID: req.body.userID},
        {
            $set: {
                description: req.body.description
            }
        });

        res.send(true); 
    }
})

app.delete("/delete", (req, res) =>
{
    const publicKey = fs.readFileSync("./public.key", "utf8");
    let token = req.headers.authorization;
    let verified = jwt.verify(token, publicKey);
    let query = {_id: ObjectId(req.body.id), user: verified.sub};
    if(verified)
    {
        let check = db.messages.remove(
            query,
            {
                justOne: true
            }
        );
        if(check)
            res.send(true);
        else
            res.send(false);
    }
    else
        res.send(false);
})

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));