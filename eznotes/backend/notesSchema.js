const mongoose  = require('mongoose');

const notesSchema = new mongoose.Schema({
    
    notes:{
        type:Array
    },
    pages:{
        type: Number
    },
  
    
  });

  module.exports = new mongoose.model('Notes', notesSchema , 'Notes');
