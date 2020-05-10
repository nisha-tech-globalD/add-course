const sqlite3 = require('sqlite3');
let bodyParser = require('body-parser');

// Build a web server 
const express = require('express'); 
const app = express();
const port = 5500;

//Parse request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//creating DB
let db = new sqlite3.Database('YOUR_DB_LOCATION ', sqlite3.OPEN_READWRITE,(err) => {
    if (err) {
      console.error(err.message);
    }
    else{
    console.log('Connected to the courseAPI database.');
    /*let insert = 'INSERT INTO book(book_id,bookName, Author, price) VALUES (?,?,?,?)';
    db.run(insert, [106,"MI","jheni",299]);
    db.run(insert, [107,"AI","Palash",999]);
    db.run(insert, [108,"Node","Anny",290]);
    db.run(insert, [109,"Go","Rambha",150]);
    db.run(insert, [110,"scala","Dolly",770]);*/

}

});

  
// Retrieve all course 
app.get('/api/courses', (req, res) => {    
let db = new sqlite3.Database('YOUR_DB_LOCATION');
    let  sql = "select * from book" ;
    getcourses =[];
    db.all(sql, getcourses, (err, rows) => {
      if (err) {
        throw err;
      }
        console.log(rows);
        res.send(rows);
      
    });
    
    });

// Retrieve  course by course id
  app.get('/api/courses/:book_id', (req, res) => {    
  let db = new sqlite3.Database('YOUR_DB_LOCATION');
  let  sql = "select bookname,price from book where book_id = ? " ;
  getcourses =[req.params.book_id];
  db.all(sql, getcourses, (err, rows) => {
    if (err) {
      throw err;
    }
      console.log(rows);
      res.send(rows);
    
  });
  
  });


    // Creating a course 
     app.post('/api/create-courses', (req, res) => {    
    //console.log(req.body);

    let data = {
      book_id: req.body.book_id,
      bookname: req.body.bookName,
      Author: req.body.Author,
      price: req.body.price
      
  }
//  console.log(data);
  let sql ='INSERT INTO book(book_id,bookName, Author, price) VALUES (?,?,?,?)' ;
  let params =[data.book_id, data.bookname, data.Author, data.price];
  //console.log(params);
  db.run(sql, params, function (err, result) {
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
        console.log(data);
        res.json({"message":"Added course"});
        console.log(data);
        res.send(result);

  
  });

});



// UPDATE  course 
app.put('/api/update-course/:book_id', (req, res) => {    
  console.log(req.body);
  let data = {
    book_id: req.body.book_id,
    bookname: req.body.bookName,
    //Author: req.body.Author,
  //  price: req.body.price
    
}
  let db = new sqlite3.Database('YOUR_DB_LOCATION');
  let  sql = "UPDATE book SET bookName= ? WHERE book_id= ?" ;
  let params =[data.bookname, data.book_id];
  //console.log(params);
  db.run(sql, params, function (err, result) {
    if (err) {
      throw err;
    }
    res.json({"message":"UPdated"});
    
  });
  
  });

// DELETE  course 
  app.delete('/api/delete-course/:book_id', (req, res) => {    
  let db = new sqlite3.Database('YOUR_DB_LOCATION');
  let  sql = "delete from book where book_id = ?" ;
  getcourses =[req.params.book_id];
  db.all(sql, getcourses, (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({"message":"deleted"});
    
  });
  
  });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));