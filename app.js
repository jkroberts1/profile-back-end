require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.REACT_APP_MONGOOSE,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const userRoutes = require('./api/profile/routes/users');

app.use('/profile', userRoutes);
app.use('/images', express.static('images'))

module.exports = app;