const express = require('express');
const dotenv = require ('dotenv').config()
const cors = require('cors')
const {mongoose}   = require('mongoose')
const app = express();


//database
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Conectado a database'))
.catch((err) => console.log('Database não conectada', err))

//midleware
app.use(express.json())

app.use('/', require('./routes/authroutes'))

const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`))
