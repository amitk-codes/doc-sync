require('dotenv').config()
require('express-async-errors');
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connection = require('./connection')
const loginSignupRoutes = require('./routes/login-signup')
const docRoutes = require('./routes/docRoutes')
const { Docs } = require('./models/doc')
const auth = require('./middlewares/auth')
const app = express()

connection()
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())

const handlePreflight = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.status(200).json({ body: 'OK' });
  } else {
    next();
  }
};

app.use(handlePreflight)
// for handling preflight requests


loginSignupRoutes(app)
app.use('/doc', docRoutes)

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`Listening on PORT ${PORT}`))