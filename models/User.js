const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    // данные конкретного пользователя (массив)
    // связка модели пользователя и данных в базе
    // будущая модель с данными ref:"Data"
    data: [{type: Types.ObjectId, ref:"Data"}]
})

model.exports = model("User", schema)