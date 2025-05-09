const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

let currentUser = null;

// FIRST: Import the whole module
const dbutil = require("./dbutil");  // or "./dbulti" if that's the actual file name

// THEN: Log the whole module for debugging
console.log("dbutil module:", dbutil);

// THEN: Destructure login from the module
const { login, insert_user, getAllVerses, insertVerse, deleteVerseById } = dbutil;

//- node middleware
//-- optinal for some versions of nodejs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors allow access to same site or other localhost 
app.use(cors()) 

//localhost port range - 3000 - 9999
const SERVER_PORT = 8080; 

app.get("/", (req,res) => {
    const _msg = "# Demo node express api 1.0.0";
    console.log(_msg)
    res.send(_msg)
});

app.get("/about", (req,res) => {
    const _msg = "# Demo node express api 1.0.0 - about route";
    console.log(_msg)
    res.send(_msg)
});

app.get("/test1", (req,res) => {
    const _msg = "# Demo node express api 1.0.0 - test1 route";
    console.log(_msg)
    res.send(_msg)
});

app.get("/login/:username/:password", (req,res) => {
     //declare username and password
     const _username = req.params.username;
     const _password = req.params.password;
 
     //send message to log
     let _msg = `login recieved: username: ${_username}, password: ${_password}`;
     console.log(_msg);
     
     let _data = {};

     login(_username, _password, async (islogin) => {
        //msg successful or unsuccessful & return as json
        _msg = "login successful";
        _data = {msg: _msg, login: true};

        if (!islogin) {
            _msg = "invalid username/password"
            _data = {msg: _msg, login: false};
        }

       res.send(_data);

     })
    
     
});


//-other - POST, DELETE, PUT

app.post("/register", (req, res) => {
    const _body = req.body;

    let msg = `register route, body: ${JSON.stringify(_body)}`;
    console.log(msg);

    let _return = {};

    const _username = _body.username;
    const _password = _body.password;

    insert_user(_username, _password, (isnewuser) => {
        msg = "registration successful";
        _return = {msg: msg, register: true};

        if (!isnewuser) {
            msg = "user already exists"
            _return = {msg: msg, register: false};
        }
        
        res.send(_return)
    });
});



    app.get("/saved-verses", async (req, res) => {

        getAllVerses((verses) => {
            res.json({ msg: verses});
        })
    
    })

    app.post("/insert-verse", async (req, res) => {

        const { book, chapter, verse} = req.body;

        insertVerse(book, chapter, verse, (success) => {
            if (success) {
                res.json({ msg: "verse added" });
            } else {
                res.status(500).json({ msg: "error inserting verse" });
            }
        })

    })

    app.delete("/delete-verse", async (req, res) => {
        const { id } = req.body;

        deleteVerseById(id, (err) => {
            if(err) {
                return res.status(500).json({ message: "Error deleting verse" });
            } else {
                res.status(200).json({ message: "Success deleting verse" });
            }

        })
    })


//-start node exporess web server - ie: live server
app.listen(SERVER_PORT, ()=>{
    let _msg = "node express websever running at port: " + SERVER_PORT;
    console.log(_msg);
})
