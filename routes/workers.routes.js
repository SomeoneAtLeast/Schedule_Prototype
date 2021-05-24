const {Router} = require("express");
const Workers = require("../models/Workers");
const router = Router();

router.get("/workers", async (req, res) => {
    try {
        const currentYear = Number(req.headers.year);
        const workers = await Workers.find({"years.id": currentYear}, {"years.$": 1, name: 1, id: 1});
        res.json(workers);
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

router.post("/workers-update", async (req, res) => {
    try {
        const currentYear = Number(req.headers.year);
        const currentMonth = Number(req.headers.month);

        const workers = req.body;
        let workersСhanges = []

        workers.forEach(elem => {
            workersСhanges.push(
                elem.years[0].months[currentMonth - 1].days
            )
        });

        let i = 1;

        workersСhanges.forEach(() => {
            const updatePath = `years.${currentYear - 1}.months.${currentMonth - 1}.days`;
            const target = {};
            target[updatePath] = workersСhanges[i - 1];
    
                Workers.updateOne(
                {id: i},
                target,
                function(){
                }
            );
                i++
        });

        res.json(workersСhanges)

    } catch (e) {
        res.status(500).json(e.message)
    }
})


module.exports = router;