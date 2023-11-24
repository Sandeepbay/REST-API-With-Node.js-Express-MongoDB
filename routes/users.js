const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Getting All
router.get('/' , async (req,res) => {
    try {
        const users = await User.find()
        res.json(users)
    }
    catch (error){
        res.status(500).json({message : error.message})
    }
    
})

// Getting One
router.get('/:id' , getUser ,(req,res) => {
    res.send(res.user)
})

// Creating One
router.post('/' , async (req,res) => {
    const user = new User({
        name: req.body.name,
        emailId : req.body.emailId
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch (error) {
        res.status(400).json({message : error.message})
    }
})

// Updating One
router.patch('/:id' , getUser , async (req,res) => {
    if(req.body.name != null) {
        res.user.name = res.body.name
    }
    if(req.body.emailId != null) {
        res.user.emailId = res.body.emailId
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }
    catch (error){  
        res.status(400).json({message: error.message})
    }
})

// Deleting One
router.delete('/:id' , getUser ,  async (req,res) => {
    try {
        await res.user.remove()
        res.json({message : "User Deleted"})
    }
    catch (error) {
        res.status(500).json({message : error.message})
    }
})

async function getUser(req,res,next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message : "Cannot find User"})
        } 
    }
    catch (error) {
        res.status(501).json({message : error.message}) 
    }

    res.user = user
    next()
}



module.exports = router