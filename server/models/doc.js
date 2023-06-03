const mongoose = require('mongoose')

const docSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  }
}, { timestamps: true })

const Docs = mongoose.model('doc', docSchema)

module.exports.Docs = Docs

