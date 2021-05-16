const destinationModel = require('../model/destination')

exports.destinations_get_all = (req, res) => {

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
};

exports.destinations_get_destination =  async (req, res) => {

    const id = req.params.destinationId

    try{
        const destination = await destinationModel.findById(id).populate('user', ['email'])
        if(destination.user == null){
            return res.status(403).json({
                msg : "deleted userInfo"
            })
        }
        else{
            res.json({destination})
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }

};

exports.destinations_post_destination = (req, res) => {

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
};

exports.destinations_patch_destination = async (req, res) => {

    const id = req.params.destinationId

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
};

exports.destinations_delete_destination = async (req, res) => {

    const id = req.params.userId

    try{

        const destination = await destinationModel.findByIdAndRemove(id)
        if(!destination){
            return res.status(402).json({
                msg : "no destination id"
            })
        }
        else{
            res.json({
                msg : "delete destination by " + id
            })
        }

    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};