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
        let workersNames = []
        let workersСhanges = []

        workers.forEach(elem => {
            workersNames.push(
                elem.name
            )
        });

        workers.forEach(elem => {
            workersСhanges.push(
                {...elem.years[0].months[currentMonth - 1]}
            )
        });

        let iNames = 1;

        workersNames.forEach(() => {
                Workers.updateOne(
                {id: iNames},
                {name: workersNames[iNames - 1]},
                function(){
                }
                );
                
                iNames++
        });


        let iWorkersСhanges = 1;

        workersСhanges.forEach(() => {
            const updatePath = `years.${currentYear - 1}.months.${currentMonth - 1}`;
            const target = {};
            target[updatePath] = workersСhanges[iWorkersСhanges - 1];
                Workers.updateOne(
                {id: iWorkersСhanges},
                target,
                function()  {
                    }
                );

                iWorkersСhanges++
        });

        res.json(workersСhanges)

    } catch (e) {
        res.status(500).json(e.message)
    }
})


module.exports = router;