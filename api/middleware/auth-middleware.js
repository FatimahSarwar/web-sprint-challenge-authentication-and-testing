const User = require('../model');

async function checkUsernameFree(req,res,next) {
    try {
      const users = await User.findBy({ username: req.body.username });
    if(!users.length) {
      next();
    } else if(!req.body.username) {
      res.status(401).json({
          message: 'Missing Credentials'
      })
    } else {
        res.status(422).json({
            message: 'Username Taken'
        })
    }
  } catch (err) {
    next(err)
  }
  }

  async function checkUsernameExists(req,res,next) {
    try {
      const users = await User.findBy({ username: req.body.username });
    if(users.length) {
      req.user = users[0]
      next();
    } else if(!req.body.username || !req.body.password) {
      res.status(401).json({
          message: 'username and password required'
      })
    } else {
      res.status(401).json({
        message: 'Invalid credentials'
    })
    }
  } catch (err) {
    next(err)
  }
  }

  module.exports = {
    checkUsernameFree,
    checkUsernameExists
  }