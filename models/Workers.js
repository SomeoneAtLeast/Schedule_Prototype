const {Schema, model} = require("mongoose");

const schema = new Schema({
    name: {type: String},
    id: {type: Number},
    years: {type: Array},
})

module.exports = model("worker", schema);