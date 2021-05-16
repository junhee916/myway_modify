const express = require('express')
const userModel = require('../model/user')
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()

// get userInfo
router.get('/', (req, res) => {
    userModel
        .find()
        .then(users => {
            res.json({
                msg : "get users",
                count : users.length,
                userInfo : users.map(user => {
                    return{
                        id : user._id,
                        name : user.name,
                        email : user.email,
                        password : user.password,
                        profileImage : user.profileImage,
                        rule : user.rule
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })
})

// signup
router.post('/signup', async (req, res) => {

    const {name, email, password} = req.body

    try{
        const user = await userModel.findOne({email})
        if(user){
            return res.status(400).json({
                msg : 'user email, please other email'
            })
        }
        else{
            const user = new userModel(
                {
                    name, email, password
                }
            )

            await user.save()

            res.json({user})
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})

// login
router.post('/login', async (req, res) => {

    const {email, password} = req.body

    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                msg : "user email, please other email"
            })
        }
        else{
            await user.comparePassword(password, (err, isMatch) => {
                if(err || !isMatch){
                    return res.status(401).json({
                        msg : "not match password"
                    })
                }
                else{
                    const payload = {
                        id : user._id,
                        email : user.email
                    }

                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_KEY,
                        {expiresIn: '1h'}
                    )

                    res.json({token})
                }
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})

// detial delete userInfo
router.delete('/:userId', checkAuth, (req, res) => {

    const id = req.params.userId

    userModel
        .findByIdAndRemove(id)
        .then(user => {
            if(!user){
                return res.status(402).json({
                    msg : "no user id"
                })
            }
            res.json({
                msg : "delete user by " + id
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })

})

module.exports = router