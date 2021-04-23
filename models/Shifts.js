const {Schema, model} = require("mongoose");

const schema = new Schema({
    finishTime: {type: String},
    firstShiftNumber: {type: String},
    fourthShiftNumber: {type: String},
    id: {type: Number},
    secondShiftNumber: {type: String},
    startTime: {type: String},
    thirdShiftNumber: {type: String},
    worker0: {type: String},
    worker1: {type: String},
    worker10: {type: String},
    worker11: {type: String},
    worker12: {type: String},
    worker2: {type: String},
    worker3: {type: String},
    worker4: {type: String},
    worker5: {type: String},
    worker6: {type: String},
    worker7: {type: String},
    worker8: {type: String},
    worker9: {type: String},
})

module.exports = model("shift", schema);