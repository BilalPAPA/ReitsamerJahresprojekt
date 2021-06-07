const fs = require('fs');
const mongoose = require('mongoose');
const Car = require('./model/car');

const uri = 'mongodb+srv://bilal:bilal@jahresprojekt.z8d98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = async () => {
    await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true})
    console.log('DB Connected...!')

    await readtomongo()
}

    var content=[];

    try {
        var contentAsString = fs.readFileSync('MOCK_DATA.json' , "utf-8")
        content = JSON.parse(contentAsString)
    }
    catch {
        content = []
    }

    connectDB();

    const readtomongo = async () => {
        content.forEach(element => {
            let car = {};
            car.carid=element.id;
            car.marke = element.marke;
            car.model = element.model;
            car.year = element.year;
            car.vin = element.vin;

            async function read(){
                let userCar = new Car(car);
                await userCar.save();
            }

            read()
        });
    }
    

