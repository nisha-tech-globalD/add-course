const sqlite3 = require('sqlite3');
let bodyParser = require('body-parser');
let nodemailer = require('nodemailer');
const sendSms = require('./twilio');


// Build a web server 
const express = require('express'); 
const app = express();
const port = 5500;

//Parse request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// plaace order  
app.post('/api/placeorder/:email', (req, res) => {    
    let db = new sqlite3.Database('YOUR_DB_LOCATION');
    let  sql = "SELECT email, password,user_id,book_id FROM users where email = ? and password =? " ;
  
    let data={
            email: req.body.email,
            password: req.body.password,
            amount: req.body.amount,
            phone: req.body.phone
          }
  
      let params =[data.email, data.password]; 
      console.log(params);
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
                insertsql= 'INSERT INTO orders(order_id,user_id, book_id, Payment_Medium,amount) VALUES (?,?,?,?,?)';
                params1=[1,onerow.user_id,onerow.book_id,"wallet",data.amount];
                console.log("param1");
                console.log(params1);
                db.run(insertsql, params1, (err, rows) => {
  
                    console.log("params1");
                   //sendMail();
                    sendmsg(data);
                    if (err) {
                      console.log("error :");
                      throw err;
                    }
                });

            res.json({"message":" WELCOME USER"});
            //res.send(rows); 
  
          }
        }
  
      }
      
    });
  });
    
//1.Login into your account Gmail or Google Apps then goto settings and Turns On the Access for less secure apps.

  function sendMail()
  { 
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: 'mymail@gmail.com',
      pass: 'mypassword'
    }
  });
    var mailOptions = {
    from: 'mymail@gmail.com',
    to: 'yourmail@gmail.com',
    subject: 'Sending Email To test',
    text: 'That was easy!'
  };

  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function sendmsg(data){
  const welcomeMessage = 'Welcome to Test World';
  sendSms(data.phone, welcomeMessage);
}