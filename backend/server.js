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


const uri = process.env.MONGO_URL;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
  })

  .catch(err => {
    console.log("Could not connect", err);
  });

app.get("/", (req, res) => {
  res.send('Welcome to EzNotess');

});

app.get("/get", async (req, res) => {
  try {
    const note = await Notes.find({ _id: "61176ef89e4da61140be5297" });

    res.send(note);

  } catch (e) {
    console.log(e);
  }
});


app.post('/add', async (req, res) => {

 
    try {
      let note = new Notes({
        notes: req.body.arr,
        pages: req.body.pg,
      });
  
      note = await note.save()
      console.log(note);
    }catch (e) {

      console.error(e);
  
    }
  
})


app.post('/update',async  (req,res)=>{

  let doc = await Notes.findOneAndUpdate({_id:req.body.id}, {notes:req.body.arr, pages:req.body.pg});
  console.log(doc)
  res.send(doc)

})


app.get('/:id', async (req, res) => {

  try {
    const note = await Notes.find({ _id: req.params.id });

    return res.send(note);

  } catch (e) {
    console.log(e);
  }

})


app.listen(5000);
