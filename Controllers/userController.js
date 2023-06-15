const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')

module.exports ={
    registerUser: async (req, res) => {
        try {
            const {email, username, password, passwordConfirm} = req.body
            if(email && username && password && passwordConfirm){
                
            }
        } catch (error) {
            
        }
    }
}
