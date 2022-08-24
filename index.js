const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const mongoString = process.env.DATABASE_URL;

const app = express();
app.use(express.json());

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', error => {
	console.log(error);
});

database.once('connected', () => {
	console.log('Database connected');
});

const PORT = 3333;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
