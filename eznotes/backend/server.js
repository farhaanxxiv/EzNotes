const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

const Notes = require('./notesSchema');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const uri  = 'mongodb+srv://sfyousuf24:richguy12321@eznotes.o0o5n.mongodb.net/EzNotes?retryWrites=true&w=majority';


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("--------------");
    })
 
    .catch(err => {
        console.log("Could not connect", err);
    });

app.get("/", (req, res) => {
  res.send('dasdsasa');

  
  });
  
app.get("/get", async (req,res) => {
  try{
    const note = await Notes.find({_id:"61025f41d5018ea19885b108"});
    res.send(note);
    //console.log(note[0].Notes[1]);
    //onsole.log(note[0].test[0].link);


    }catch(e){
        console.log(e);
    }
});
 

  const PORT = '9000'; 
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

