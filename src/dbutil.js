const sqlite3 = require("sqlite3").verbose();

const db_name = "src/data/biblevdashboard.db";

const login = function(username, password, logincb) {
    const _function_name = "login";
    //declare message
    let msg = "";
    //declare a variable false (for later use)
    let _return = false;

    //try block 
    try {
        msg = `${_function_name}`;
        
        //declare connection to sqlite3.Database
        const db = new sqlite3.Database(
            db_name,
            sqlite3.OPEN_READWRITE,
            (err) => {
                if (err) {
                    msg = "error connecting to db";
                    console.log(msg);
                    console.log(err);
                }
                else {
                    msg = "connecting to db";
                    console.log(msg);

                    db.all("SELECT * FROM user", [], (err, rows) => {
                        if (err) {
                          console.log("ERROR reading user table:", err);
                        } else {
                          console.log("USER TABLE ROWS:", rows);
                        }
                      });
                    
                }
            },
        );

        //declare _uid and _pwd
        const _uid = username;
        const _pwd = password;

    //db.get (SELECT query)
        db.get(
            `SELECT id, username FROM user WHERE username='${_uid}' and password='${_pwd}'`,
            (err,row) => {
                if (err) {
                    msg = "select user error";
                    console.log(msg);
                }
                else {
                    if (row) {
                        msg = `user: ${row.id} - ${row.username}`;
                        console.log(msg);
                        _return = true;
                        logincb(_return);
                    } else {
                        msg = "user not found"
                        console.log(msg);
                        logincb(_return);
                    }
                }
            },
        );     
        
        //close
        db.close((err) => {
            if (err) {
                console.log(`${_function_name}: error`);
                console.log(err);
            }
            else {
                console.log("db closed");
            }
        });
    } //catch error code
    catch (error) {
        console.log(`${_function_name}: error`);
        console.log(error);
        _return = false;
    }

    return _return;
}

module.exports = { login };