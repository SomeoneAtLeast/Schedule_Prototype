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

router.post("/dates-update", async (req, res) => {
    try {
        const currentYear = Number(req.headers.year);
        const currentMonth = Number(req.headers.month);
        const dates = req.body;
        const oneMonth = {...dates[0].months[currentMonth - 1]}

        const updatePath = `months.${currentMonth - 1}`;
        const target = {};
        target[updatePath] = oneMonth;
        Dates.updateOne(
            {id: currentYear},
            target,
            function(){
            }
            );


        res.json()

    } catch (e) {
        res.status(500).json(e.message)
    }
})


module.exports = router;