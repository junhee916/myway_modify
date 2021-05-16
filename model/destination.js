const mongoose = require('mongoose')

const destinationSchema = mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
            required : true
        },
        nickname : {
            type : String,
            required: true
        },
        startPoint : {
            type : String,
            required : true
        },
        endPoint : {
            type : String,
            default : 'arrive'
        }
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model('destination', destinationSchema)