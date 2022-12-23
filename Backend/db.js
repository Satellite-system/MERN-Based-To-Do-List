const mongoose = require('mongoose');

// user = zkaU
// pwd = CzfVA44xfUXU8FFj

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://zkaU:CzfVA44xfUXU8FFj@cluster0.wzuunn3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const connectToMongo = () =>{
   mongoose.set('strictQuery', true);
   mongoose.connect(uri, ()=>{
      console.log("Connected to DataBase");
   })
}

module.exports = connectToMongo;