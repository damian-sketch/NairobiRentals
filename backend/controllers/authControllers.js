import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'

//function to register a user
export const registerUser = asyncHandler(async(req, res) => {

    const user = req.body
    
    //check if userame or email have been taken
    const takenUsername = await User.findOne({userName: user.username})
    const takenEmail = await User.findOne({email:user.email})
    
    if (takenUsername || takenEmail) {
        res.json({message: "Username or email has already been taken"})
    } else {
        // this needs to be done before user is saved
        user.password = await bcrypt.hash(req.body.password, 10)

        const dbUser = new User({
            userName: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password
        })

            dbUser.save(function(err){
            if(err){
            res.json(err.message)
        }else{

            res.json({message: "User registered successfully"})
        }
    })
    }
       
       
})