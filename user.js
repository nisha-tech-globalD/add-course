const sqlite3 = require('sqlite3');
let bodyParser = require('body-parser');

// Build a web server 
const express = require('express'); 
const app = express();
const port = 5500;

//Parse request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


// Register user
    app.post('/api/register-user', (req, res) => {    
        //console.log(req.body);
        let db = new sqlite3.Database('YOUR_DB_LOCATION');
        let data = {
          user_id: req.body.user_id,
          user_name: req.body.user_name,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          book_id: req.body.book_id
          
      }
      console.log(data);
      let sql ='INSERT INTO users(user_id,user_name, email, password, role,book_id) VALUES (?,?,?,?,?,?)' ;
      let params =[data.user_id, data.user_name, data.email, data.password,data.role,data.book_id];
      //console.log(params);
      db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        else{
            if(data.email===null)throw "Email is required" ;
            else if(data.password===null )throw "password is required";
            else if(data.email!=mailformat) throw "Invalid email format";
            else{
            console.log(data);
            res.json({"message":"Registered user successfully"});
            console.log(data);
            res.send(result);
        
      }

        }
      });
      
    });
// Retrieve  user by user id
app.get('/api/get-user/:user_id', (req, res) => {    
  let db = new sqlite3.Database('YOUR_DB_LOCATION');
  let  sql = "select * from users where user_id = ? " ;
  console.log(req.params);
  getuser =[req.params.user_id];
  db.all(sql, getuser, (err, rows) => {
    if (err) {
      throw err;
    }
      console.log(rows);
      res.send(rows);
    
  });
  
  

 
});

// Retrieve  user details by role
app.get('/api/user-detail/:book_id', (req, res) => {    
  let db = new sqlite3.Database('YOUR_DB_LOCATION');
  let  sql = "SELECT users.user_name,users.email,users.role,book.bookName,book.price FROM users INNER JOIN book ON users.book_id=book.book_id and book.book_id=? " ;
  book_id =[req.params.book_id];
  db.all(sql, book_id, (err, rows) => {
    if (err) {
      throw err;
    }
    else{   
      for (const onerow of rows) {
        if(onerow.role==='Member'){
          console.log("You are not Authorized to view details");
          res.json({"message":"You are not Authorized to view details"});

        }

        else{
          console.log(rows);
          res.send(rows);          
        }
      }

     
   
  }

  });
  
  });


// validate user  
app.post('/api/verify-user/:email', (req, res) => {    
  let db = new sqlite3.Database('YOUR_DB_LOCATION');
  let  sql = "SELECT email, password FROM users where email = ? and password =? " ;

  let data={
          email: req.body.email,
          password: req.body.password 
        }

    let params =[data.email, data.password]; 
    //console.log(data.email);
    db.all(sql, params, (err, rows) => {

    //console.log(data.email);
    console.log(rows);

    if (err) {
      console.log("error :");
      throw err;
    }
    
    else if(rows.length<1){
      //throw("Invalid user name or password");
      console.log("Invalid user name or password");
      res.json({"message":"Invalid user name or password"});
    }

    else{   
      for (const onerow of rows) {
        //console.log(onerow.email);
        //console.log(onerow.password);
          if(onerow.email===data.email && onerow.password===data.password)
          {
          console.log("Welcome");
          console.log(rows);
          res.json({"message":" WELCOME USER"});
          //res.send(rows); 

        }
      }

    }
    
  });
});
  

