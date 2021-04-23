const {Router} = require("express");
const Shifts = require("../models/Shifts");
const ShiftsKm = require("../models/Shifts-Km");
const router = Router();

router.get("/shifts", async (req, res) => {
    try {
        const shifts = await Shifts.find();
        res.json(shifts);
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

router.get("/shifts-km", async (req, res) => {
    try {
        const shiftsKm = await ShiftsKm.find();
        res.json(shiftsKm);
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})


module.exports = router;