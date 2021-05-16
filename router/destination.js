const express = require('express')
const destinationModel = require('../model/destination')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()

// total get destination
router.get('/', checkAuth, (req, res) => {

    destinationModel
        .find()
        .populate('user', ['email'])
        .then(destinations => {
            res.json({
                msg : "get destinations",
                count : destinations.length,
                destinationInfo : destinations.map(destination => {
                    return{
                        id : destination._id,
                        user : destination.user,
                        nickname : destination.nickname,
                        startPoint : destination.startPoint,
                        endPoint : destination.endPoint
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

// detail get destination
router.get('/:userId', checkAuth, async (req, res) => {

    const id = req.params.userId

    try{
        const destination = await destinationModel.findById(id).populate('user', ['email'])
        res.json({destination})
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }

})

// register destination
router.post('/', checkAuth, (req, res) => {

    const {user, nickname, startPoint, endPoint} = req.body

    const newDestination = new destinationModel(
        {
            user,
            nickname,
            startPoint,
            endPoint
        }
    )

    newDestination
        .save()
        .then(destination => {
            res.json({
                msg : "register destination",
                destinationInfo : {
                    id : destination._id,
                    user : destination.user,
                    nickname : destination.nickname,
                    startPoint : destination.startPoint,
                    endPoint : destination.endPoint
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })
})

// update destination
router.patch('/:userId', checkAuth, async (req, res) => {

    const id = req.params.userId

    const updateOps = {}

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }

    try{
        await destinationModel.findByIdAndUpdate(id, {$set : updateOps})
        res.json({
            msg : "update destination by " + id
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})

// detail delete destination
router.delete('/:userId', checkAuth, async (req, res) => {

    const id = req.params.userId

    try{
        await destinationModel.findByIdAndRemove(id)
        res.json({
            msg : "delete destination by " + id
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})

module.exports = router