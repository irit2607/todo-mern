const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    work :{
        type: String,
        required: true,
    },
   

    // status : {
    //     type : Boolean,
    //     default:false,
    // }

})

module.exports = mongoose.model('work', taskSchema);