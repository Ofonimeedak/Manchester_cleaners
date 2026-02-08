const app=require('./server/server');
const {MongoDb}=require('./dataBase/database');
const mongoose=require('mongoose')

const mongoDbConection= new MongoDb(mongoose);
mongoDbConection.connect();