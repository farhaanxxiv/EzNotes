const mongoose  = require('mongoose');

const notesSchema = new mongoose.Schema({
    
    test:{
        type:Array
    },
  
    
  });

  module.exports = new mongoose.model('Notes', notesSchema , 'Notes');
