const {Router} = require("express");
// const config = require("config");
const Test = require("../models/Test");
const router = Router();

router.get("/test", async (req, res) => {
    try {

        const test = await Test.find();

        console.log(test);

        res.json(test);
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

module.exports = router;