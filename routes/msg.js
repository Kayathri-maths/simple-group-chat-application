const express = require('express');
const fs = require('fs');
const datas =require('./data');

const router = express.Router();

router.get('/', (req,res,next) => {
     fs.readFile('msg.txt',{encoding : 'utf8'},(err,data) => {
      if(err){
        console.log(err);
        data="No chat Exist";
      }
    //  console.log(data);
      res.send(`<html><body>${data}<form  action ="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" 
       method="POST">
       <input id="message" type="text" name="message" placeHolder="message">
       <input type="hidden" name="username" id="username">
         <button type="submit">Send</button></form><html><body>`)
     });
     
});

router.post('/', (req,res,next) => {
   
   fs.writeFile('msg.txt',`${req.body.username}:${req.body.message}`,{flag : 'a'},(err)=>{
    if(err){
      console.log(err);
    }
    datas.push(`{${req.body.username}:${req.body.message}}`);
    // console.log(datas);
   // console.log(`${req.body.username}:${req.body.message}`);
    res.redirect('/');
           
   });

});

module.exports = router;