const mongoose = require('mongoose')

const Carschema = new mongoose.Schema({
    carid:{
        type: String,
        required: true
    },
    marke: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  vin: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Cars', Carschema)