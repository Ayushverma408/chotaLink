const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');

const signup = async(req, res) => {
     try {
          const{ username, password} = req.body

          const existingUser = await User.findOne({username})
          if(existingUser){
               return res.status(400).json({message: "Username already exists!"})
          }

          const newUser = new User({username, password})
          await newUser.save()

          const token = jwt.sign(
               {userId: newUser._id},
               process.env.JWT_SECRET,
               {expiresIn: '1h'}
          )

          res.status(201).json({
               message: "User created succesfully",
               token, 
               userId: newUser._id
          })
     }
     catch(error){
          res.status(500).json({message: "Error creating user", error: error.message})
     }
}
const login = async(req, res) => {
     try{
          const {username, password} = req.body
          const user = await User.findOne({username})
          if(!user) {
               return res.status(401).json({message: "Username doesnt exist in the database"})
          }

          const isMatch = await user.comparePassword(password)
          if(!isMatch){
               return res.status(401).json({message: "Invalid password"})
          }
          const token = jwt.sign(               
          { userId: user._id }, 
          process.env.JWT_SECRET, 
          { expiresIn: '1h' }
          )
          res.json({
               message: "Login successful",
               token, 
               userId: user._id
          })
     }
     catch{
          res.status(500).json({message: "Error validating user", error: error.message})
     }
}
module.exports = {
     signup, login
}