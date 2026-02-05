const express=require('express');
require('dotenv').config();

const port=process.env.PORT;

const app=express();

app.listen(port || 5000,()=>{

    console.log(`Server is runing on ${port}`)
});