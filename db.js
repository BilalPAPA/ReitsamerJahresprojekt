const mongoose = require('mongoose');

//const uri = 'mongodb+srv://SypProject:SypProjekt@spx.fsup9.mongodb.net/SPx?retryWrites=true&w=majority'
const uri = 'mongodb+srv://bilal:bilal@jahresprojekt.z8d98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = async () => {
    await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true})
    console.log('DB Connected...!')
}

module.exports = connectDB