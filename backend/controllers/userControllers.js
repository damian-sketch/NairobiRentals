import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

//function to get all users
export const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find()
    res.json(users)
})

// function to get user by id
export const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.param.id)

    if(user){
        res.json(user)
    }else{
        res.status(404).json({message: "User not found"})
        res.status(404)
        throw new Error('User not found')
    }
})