const {Router} = require("express");
const Seats = require("../models/Seats");
const router = Router();

router.get("/seats", async (req, res) => {
    try {
        const seats = await Seats.find();
        res.json(seats);
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

module.exports = router;