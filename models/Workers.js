const {Schema, model} = require("mongoose");

const schema = new Schema({
    name: {type: String, required: true},
    id: {type: Number, required: true},
    years: {type: Array},
})

module.exports = model("worker", schema);