const express = require('express');
const authorRouter = express.Router(); 
const jwt = require('jsonwebtoken');
const Authordata= require('../model/Authordata');

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

// Authors
authorRouter.get('/',function(req,res){
    // res.header("Access-Control-Allow-Orgin","*")
    // res.header('Access-Control-Allow-Methods: GET,POST, PATCH , PUT, DELETE,OPTIONS');
    Authordata.find()
       .then(function(products){
        res.send(products);
    });
})

// Author
authorRouter.get('/:id',  (req, res) => {
  console.log('getttttauth')
    const id = req.params.id;
      Authordata.findOne({"_id":id})
      .then((author)=>{
          res.send(author);
      });
  })
// Add Author
authorRouter.post('/add',function(req,res){
    res.header("Access-Control-Allow-Orgin","*")
    res.header('Access-Control-Allow-Methods: GET,POST, PATCH , PUT, DELETE,OPTIONS');
    console.log(req.body);
    var author ={
        name : req.body.author.name,
        nationality : req.body.author.nationality,
        image : req.body.author.image,
        details : req.body.author.details,
    }
    var author =new Authordata(author);
    author.save();
});
 // update
authorRouter.put('/update',verifyToken,(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    name=req.body.name,
    nationality = req.body.nationality,
    image = req.body.image,
    details = req.body.details,
   Authordata.findByIdAndUpdate({"_id":id},
                                {$set:{"name":name,
                                "nationality":nationality,
                                "image":image,
                                "details":details,
                                }})
   .then(function(){
       res.send();
   })
 })
//  delete
authorRouter.delete('/remove/:id',verifyToken,(req,res)=>{
   
    id = req.params.id;
    Authordata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })
module.exports = authorRouter;