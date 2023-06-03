const mongoose = require('mongoose')
const DB = process.env.DB

module.exports = () => {
  mongoose.connect(DB)
    .then(()=>console.log('Connected to DB'))
    .catch((err)=>console.log('DB connection error:', err))
}

