const {Router} = require("express");
const Shifts = require("../models/Workers");
const router = Router();

router.get("/workers", async (req, res) => {
    try {
        const shifts = await Shifts.find();
        res.json(shifts);
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

module.exports = router;