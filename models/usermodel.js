const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
     uname: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          lowercase: true
     },
     password: {
          type: String, 
          required: true
     },
     createdAt: {
          type: Date,
          default: Date.now
     }
})

UserSchema.pre('save', async function(next){
     if(!this.isModified('password')) return next();
     try{
          const salt = await bcrypt.genSalt(10)
          this.password = await bcrypt.hash(this.password, salt)
          next()
     }
     catch(error){
          console.log(error)
          next(error)
     }
})

UserSchema.methods.comparePassword = async function(candidatePassword){
     return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)