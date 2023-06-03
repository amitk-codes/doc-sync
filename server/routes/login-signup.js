const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Users, usersValidation } = require('../models/user')

// I have handled the async error as a separate middleware to avoid try catch
// repetitions and improve code readability

module.exports = (app) => {
  app.post('/signup', async(req, res)=>{
    const {name, email, password} = req.body
    const {error} = usersValidation(req.body)
    if(error) return res.status(400).send({message: error.message})
    const searchUser = await Users.findOne({email})
    if(searchUser) return res.status(400).send({message: 'User already registered'})
    const newUser = new Users({name, email, password})
    await newUser.save()
    res.status(201).send({message: 'User successfully registered'})

  })

  app.post('/login', async(req, res)=>{
    const {email, password} = req.body
    const searchUser = await Users.findOne({email})
    if(!searchUser) return res.status(400).send({message: 'Incorrect email or password'})
    const passwordMatch = await bcrypt.compare(password, searchUser.password)
    if(!passwordMatch) return res.status(400).send({message: 'Incorrect email or password'})

    const token = searchUser.generateToken()
    res.status(200).send({message: 'User logged in', jwtToken: token})
  })

}