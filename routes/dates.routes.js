const {Router} = require("express");
const Dates = require("../models/Dates");
const router = Router();

router.get("/dates", async (req, res) => {
    try {
        const currentYear = Number(req.headers.year);

        const dates = await Dates.find({id: currentYear}, {months: 1, name: 1, id: 1});
        res.json(dates);
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

module.exports = router;