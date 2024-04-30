const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const car = require('./model/carConfig.js');

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

mongoose.connect(process.env.MONGODB_URI)

app.listen(3000, (req, res) => {
    console.log('Im working!');
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/cars', async (req, res) => {
    const allCars = await car.find();
    res.render('cars/inventory.ejs', {
        cars: allCars,
    });
});

app.get('/cars/new', (req, res) => {
    res.render('cars/new.ejs');
});

app.post('/cars', async (req, res) => {
    if (req.body.isPrepped === 'on') {
        req.body.isPrepped = true;
    } else {
        req.body.isPrepped = false;
    }
    const newCar = await car.create(req.body);
    res.redirect('/cars');
});

app.put('/cars/:carId', async (req, res) => {
    if (req.body.isPrepped === 'on') {
        req.body.isPrepped = true;
    } else {
        req.body.isPrepped = false;
    }
    await car.findByIdAndUpdate(req.params.carId, req.body);
    res.redirect('/cars');
});

app.get('/cars/:carId', async (req, res) => {
    const selectedCar = await car.findById(req.params.carId);
    res.render('cars/show.ejs', {
        clickedCar: selectedCar,
    });
});

app.get('/cars/:carId/edit', async (req, res) => {
    const selectedCar = await car.findById(req.params.carId);
    res.render('cars/edit.ejs', {
        selectedCar: selectedCar,
    });
})