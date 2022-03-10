import asyncHandler from 'express-async-handler'
import {verifyToken} from '../middlewares/authJWT.js';
import cookieParser from 'cookie-parser';
import express from 'express';

//function to get all posts
export const getPosts = asyncHandler(async(req, res) => {


    const app = express()
    app.use(cookieParser)

    try{
        const cookies = req.headers.cookie
        const token = cookies.match(new RegExp('(?<=token=).*'))[0]
        
        if(verifyToken(token)){
            const posts = ['polo', 'poloewoieoiwew']
             res.json(posts)
        }else{
            res.json('Bad token')
        }
    } catch(error){
        
        const posts = 'You need to login first'
        res.json(posts)
        
    }
    
    
})

// // function to get user by id
// export const getUserById = asyncHandler(async(req, res) => {
//     const user = await User.findById(req.param.id)

//     if(user){
//         res.json(user)
//     }else{
//         res.status(404).json({message: "User not found"})
//         res.status(404)
//         throw new Error('User not found')
//     }
// })