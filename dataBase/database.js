require('dotenv').config();
const mongoose = require("mongoose");

class Database {
  connect() {
    throw new Error("Database connection must be implemented");
  }

  diconnect() {
    throw new Error("Database disconnection must be implemented");
  }
}

class MongoDb extends Database {
  constructor(mongoose) {
    super();
    this.mongoose = mongoose;
  }
  async connect() {
    try {
      await this.mongoose.connect(process.env.MONGODB_STRING);
      console.log("Database connected successfully");
    } catch (err) {
      throw new Error(err.message);
    }
  }

   async diconnect() {
    try {
      await this.mongoose.disconnect();
      console.log("MongoDB disconnected");
    } catch (err) {
      throw new Error("Error disconnecting from db");
    }
  }
}

class Postgres extends Database{
constructor(){
    super();
    this.connect()
}

connect(){



}

disconnect(){



}
}

module.exports={MongoDb,Postgres}


