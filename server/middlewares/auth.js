const jwt = require('jsonwebtoken')
const _ = require('lodash');
const { Users } = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRETKEY)
    let user = await Users.findOne({ _id: decoded._id })
    user = _.omit(JSON.parse(JSON.stringify(user)), ['password'])
    // removing the password property from user before setting (req.user = user)
    // to avoid security risks.
    req.user = user
    req.token = token
    next()

  } catch (err) {
    return res.status(401).json({ message: 'Not Authorised to perform this task' })

  }
}