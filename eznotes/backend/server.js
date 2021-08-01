const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const Notes = require('./notesSchema');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const uri  = process.env.MONGO_URL;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected");
    })
 
    .catch(err => {
        console.log("Could not connect", err);
    });

app.get("/", (req, res) => {
  res.send('Welcome to EzNotes');

  });
  
app.get("/get", async (req,res) => {
  try{
    const note = await Notes.find({_id:"61025f41d5018ea19885b108"});
    res.send(note);

    }catch(e){
        console.log(e);
    }
});
 

  const PORT = '9000'; 
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

