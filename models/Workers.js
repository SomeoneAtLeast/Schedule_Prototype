const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    name: {type: String, required: true},
    id: {type: Number, required: true},
    years: {type: Array},
    owner: {type: Types.ObjectId, ref: "User"}
})

module.exports = model("worker", schema);