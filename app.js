require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@1234@profiles-app-pxuos.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const userRoutes = require('./api/profile/routes/users');

app.use('/profile', userRoutes);
app.use('/images', express.static('images'))

module.exports = app;