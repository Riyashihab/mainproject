const express = require('express');
const booksRouter = express.Router(); 
const jwt = require('jsonwebtoken');
const Bookdata = require('../model/BookData');


function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }
// Books
booksRouter.get('/',function(req,res){
    // res.header("Access-Control-Allow-Orgin","*")
    // res.header('Access-Control-Allow-Methods: GET,POST, PATCH , PUT, DELETE,OPTIONS');
    Bookdata.find()
       .then(function(books){
        res.send(books);
    });
})

// book
booksRouter.get('/:id',  (req, res) => {
  
    const id = req.params.id;
      Bookdata.findOne({"_id":id})
      .then((book)=>{
          res.send(book);
      });
  })
// Add Book

booksRouter.post('/add',function(req,res){
    res.header("Access-Control-Allow-Orgin","*")
    res.header('Access-Control-Allow-Methods: GET,POST, PATCH , PUT, DELETE,OPTIONS');
    console.log(req.body);
    var book ={
        title : req.body.book.title,
        author : req.body.book.author,
        genre : req.body.book.genre,
        image : req.body.book.image,
        details : req.body.book.details,
    }
    var book =new Bookdata(book);
    book.save();
});
// update
booksRouter.put('/update',verifyToken,(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    title = req.body.title,
    author = req.body.author,
    genre = req.body.genre,
    image = req.body.image,
    details = req.body.details,
   Bookdata.findByIdAndUpdate({"_id":id},
                                {$set:{"title":title,
                                "author":author,
                                "genre":genre,
                                "image":image,
                                "details":details,
                                }})
   .then(function(){
       res.send();
   })
 })
//  delete
booksRouter.delete('/remove/:id',verifyToken,(req,res)=>{
   
    id = req.params.id;
    Bookdata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })
 
module.exports = booksRouter;