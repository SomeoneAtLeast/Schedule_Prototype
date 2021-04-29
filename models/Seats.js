const {Schema, model} = require("mongoose");

const schema = new Schema({
    oldIp: {type: String},
    newIp: {type: String},
    seatNumber: {type: String},
})

module.exports = model("seat", schema);