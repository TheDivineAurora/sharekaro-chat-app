const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({

    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        max: 300,
    },
    image: {
        type: String,

    },
    likes: {
        type: Array,
        default: [],
    }

})



module.exports = mongoose.model("posts", PostSchema);