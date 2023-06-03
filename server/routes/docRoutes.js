const express = require('express')
const auth = require('../middlewares/auth')
const {Docs} = require('../models/doc')
const router = express.Router()

// I have handled the async error as a separate middleware to avoid try catch
// repetitions and improve code readability

router.get('/', auth, async(req, res)=>{
  const userId = req?.user?._id
  const userName = req?.user?.name
  const docs = await Docs.find({user: userId}).populate('user', 'name').sort({ updatedAt: -1 })
  res.status(200).send({responseData: docs, userName})
})

router.get('/:id', auth, async(req, res)=>{
  const {id} = req.params
  const doc = await Docs.findById(id)
  if(!doc) return res.status(404).send({message: 'Doc not found'})
  res.status(200).send({responseData: doc})
})

router.post('/', auth, async(req, res)=>{
  const userId = req?.user?._id
  const {title, content} = req.body
  const newDoc = new Docs({title, content, user: userId})
  await newDoc.save()
  res.status(201).send({responseData: newDoc._id})
})

router.put('/:id', auth, async(req, res)=>{
  const {id} = req.params
  const updates = req.body
  const doc = await Docs.findById(id)
  if(!doc) return res.status(404).send({message: 'Doc not found'})

  for(const key in updates){
    if(doc[key] !== updates[key]){
      doc[key] = updates[key]
    }
  }

  await doc.save()

  res.status(200).send({message: 'doc updated successfully'})

})

router.delete('/:id', auth, async(req, res)=>{
  const {id} = req.params
  const deletedDoc = await Docs.findByIdAndDelete(id)
  if(!deletedDoc) return res.status(404).send({message: 'doc not found'})
  res.status(200).send({message: 'doc deleted successfully'})
})

module.exports = router