const {Router} = require("express");
const Workers = require("../models/Workers");
const router = Router();

router.get("/workers", async (req, res) => {
    try {
        const EYSR = Number(req.headers.year);
        console.log(EYSR)
        const workers = await Workers.find({years: {$elemMatch: {id: EYSR}}}, {'years.$': 1, name: 1, id: 1});

        console.log(req.headers.year)
        console.log(workers)
        res.json(workers);
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

module.exports = router;