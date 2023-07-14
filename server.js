 const PORT=8000;
 const express= require("express");
 const cors= require("cors");
 require('dotenv').config();
 const app=express();



 //since we are using json type so express.json
 //we cant pass  over json from frontend to backend without this
 app.use(express.json());
 app.use(cors());
 app.listen(PORT ,()=> console.log("your server is running on port:"+PORT));

 
 const API_KEY=process.env.API_KEY ;

 //asynchronus function for requesting and getting response using api
 app.post('/completions',  async (req ,res)=>{
    const options={
        method:"POST",
        headers:{
            "Authorization":`Bearer ${API_KEY}`,
            "Content-Type":'application/json'
        },
        body: JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{
                role:"user",
                //instead of hardcoding we are getting request from client (app.js) which is present at body and message insdie it
                content:req.body.message,       
            }],
            max_tokens:100,
        })
    }
 {
 try{
    const response= await fetch('https://api.openai.com/v1/chat/completions' ,options);
    const data= await response.json();
    //sending daata back to client
    res.send(data);
 }
 catch(error){
    console.log(error);

 }
 }
 });


