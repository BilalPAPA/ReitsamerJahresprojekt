const express = require('express');
const app = express();
const connectDB=require('./db')
const Car = require('./model/car');

connectDB();

app.get('/', async function(req, res){
    var carid = req.query.carid;

    var result;
    await Car.findOne({carid:carid}, function (err, res) {//car, fun...
        result=res;
    })
    
    console.log(result)
    res.json(result);
})

app.get('/findbymodel', async function(req, res){
    var model = req.query.model;

    var result;
    await Car.find({model:model}, function (err, res) {//car, fun...
          result=res;
    })

    res.json(result);
})

app.get('/finbymarke', async function(req, res){
    var marke = req.query.marke;

    var result;
    await Car.find({marke:marke}, function (err, res) {//car, fun...
          result=res;
    })

    res.json(result);
})

app.post('/create', async function(req, res){
    
    await Car.find(function (err, res) {
        result=res;
    })
//http://localhost:3000/create?marke=Bugatti&model=Veron&year=2017&vin=EDRFGHZGRTZ
    var createcar = {};
    createcar.carid = result.length+1;
    createcar.marke = req.query.marke;
    createcar.model = req.query.model;
    createcar.year = req.query.year;
    createcar.vin = req.query.vin;

    console.log(createcar);
//satutscode fehlt
    let carModel = new Car(createcar);
    await carModel.save();
    //createcar.statuscode = 200;
    res.json(createcar);
})

app.patch('/update', async function(req, res){
    
    var result;
    await Car.findOne({carid:req.query.carid}, function (err, res) {//car, fun...
          result=res;
    })
    console.log(result)
    createcar={};
    (req.query.marke==undefined) ?  createcar.marke = result.marke: createcar.marke=req.query.marke;
   
    (req.query.model==undefined) ?  createcar.model = result.model: createcar.model=req.query.model;
   
    (req.query.year==undefined) ?  createcar.year = result.year: createcar.year=req.query.year;
  
    (req.query.vin==undefined) ?  createcar.vin = result.vin: createcar.vin=req.query.vin;

   
    await Car.updateOne({carid:req.query.carid},{marke:createcar.marke, model:createcar.model, year : createcar.year, vin : createcar.vin})
    
    res.json(createcar);
})

app.delete('/delete', async function(req, res){
    
    var createcar = {};
    createcar.carid = req.query.carid;
    
    await Car.deleteOne({carid:req.query.carid});

    res.json(createcar);
})

const Port = process.env.Port || 3000;

app.listen(Port, () => console.log('Server Started'))//startet den Server und lauscht dem port