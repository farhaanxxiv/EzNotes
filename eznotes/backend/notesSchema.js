const mongoose  = require('mongoose');

const notesSchema = new mongoose.Schema({
    
    notes:{
        type:Array
    },
  
    
  });

  module.exports = new mongoose.model('Notes', notesSchema , 'Notes');
