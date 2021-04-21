const {Router} = require("express");
const Shifts = require("../models/Shifts");
const router = Router();

router.get("/shifts", async (req, res) => {
    try {
        const shifts = await Shifts.find();
        console.log(shifts);
        res.json(shifts);
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

module.exports = router;