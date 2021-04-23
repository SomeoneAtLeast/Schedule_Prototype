const {Schema, model} = require("mongoose");

const schema = new Schema({
    id: {type: Number},
    shiftNumber: {type: Number},
    worker: {type: String},
})

module.exports = model("shift-km", schema);