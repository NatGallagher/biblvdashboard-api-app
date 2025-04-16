const express = require("express"); //coding framework 
const cors = require("cors");  //does not block different servers
const app = express();  
const bodyParser = require("body-parser");
const { login, insert_user } = require("./dbutil");

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

     login(_username, _password, (islogin) => {
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

//-start node exporess web server - ie: live server
app.listen(SERVER_PORT, ()=>{
    let _msg = "node express websever running at port: " + SERVER_PORT;
    console.log(_msg);
})
