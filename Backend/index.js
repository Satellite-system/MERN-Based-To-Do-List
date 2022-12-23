const express = require('express');
const router = express.Router();
const connectToMongoose = require('./db.js');

//Connect to db
connectToMongoose();

const port = process.env.PORT | 3000 ;
const app = express();

//to enable to send json file
app.use(express.json());

app.get('/',(req,res)=>{
   res.status(200).send("Server is Running")
})

app.use('/list', require('./routes/notes'))


app.listen(port,  () => {
  console.log(`Server running at port : ${port} `);
});