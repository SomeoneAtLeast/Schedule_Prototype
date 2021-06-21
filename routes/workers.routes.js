const {Router} = require("express");
const Workers = require("../models/Workers");
const Prototype = require("../models/Prototype");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/workers-generate", async (req, res) => {
    try {
        const newWorker = await Prototype.find({}, {_id: 0});
        const newWorkerData = req.body;
        let lastWorkerInDb = await Workers.find().limit(1).sort({$natural:-1});
        let startMonth = null;

        if (lastWorkerInDb.length === 0) {
            lastWorkerInDb.push({
                id: 1
            })
        } 

        if (newWorkerData.workStartMonth === "Январь") startMonth = 0;
        if (newWorkerData.workStartMonth === "Февраль") startMonth = 1;
        if (newWorkerData.workStartMonth === "Март") startMonth = 2;
        if (newWorkerData.workStartMonth === "Апрель") startMonth = 3;
        if (newWorkerData.workStartMonth === "Май") startMonth = 4;
        if (newWorkerData.workStartMonth === "Июнь") startMonth = 5;
        if (newWorkerData.workStartMonth === "Июль") startMonth = 6;
        if (newWorkerData.workStartMonth === "Август") startMonth = 7;
        if (newWorkerData.workStartMonth === "Сентябрь") startMonth = 8;
        if (newWorkerData.workStartMonth === "Октябрь") startMonth = 9;
        if (newWorkerData.workStartMonth === "Ноябрь") startMonth = 10;
        if (newWorkerData.workStartMonth === "Декабрь") startMonth = 11;

        if (Number(newWorkerData.workStartYear) === 2022) {
            newWorker[0].years.splice(0, 1)
        }

        let doesntExistMonths = [];

        let i = 0;

        while (i < startMonth) {
            doesntExistMonths.push({name: "DoesntExist"})
            i++
        }

        if (startMonth > 0) {
            newWorker[0].years[0].months.splice(0, startMonth, ...doesntExistMonths)
        }

        newWorker[0].name = newWorkerData.name;

        newWorker[0].id = ++lastWorkerInDb[0].id;


        Workers.insertMany(newWorker);
        res.json(newWorker)
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})


router.get("/workers", async (req, res) => {
    try {
        const currentYear = Number(req.headers.year);
        const currentMonth = Number(req.headers.month);
        const workers = await Workers.find({"years.id": currentYear}, {"years.$": 1, name: 1, id: 1});

        let finalWorkers = [];


        workers.forEach(elem => {
            const targetMonth = elem.years[0].months.slice(currentMonth - 1, currentMonth);
            elem.years[0].months = targetMonth;

            if (elem.years[0].months[0].name !== "DoesntExist") {
                finalWorkers.push(elem)
            }
        });

        res.json(finalWorkers);
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

router.post("/workers-update", async (req, res) => {
    try {
        const currentYear = Number(req.headers.year);
        const currentMonth = Number(req.headers.month);

        const workers = req.body;
        let iDWorkersInDb = [];
        let workersNames = [];
        let workersСhanges = [];

        const workersInDb = await Workers.find();

        workersInDb.forEach(elem => {
            iDWorkersInDb.push(
                elem._id
            )
        });

        workers.forEach(elem => {
            workersNames.push(
                elem.name
            )
        });

        workers.forEach(elem => {
            workersСhanges.push(
                {...elem.years[0].months[0]}
            )
        });

        let iNames = 1;

        iDWorkersInDb.forEach(() => {
                Workers.updateOne(
                {_id: iDWorkersInDb[iNames - 1]},
                {name: workersNames[iNames - 1]},
                function(){
                }
                );
                
                iNames++
        });

        let iWorkersСhanges = 1;

        iDWorkersInDb.forEach(() => {
            const updatePath = `years.${currentYear - 1}.months.${currentMonth - 1}`;
            const target = {};
            target[updatePath] = workersСhanges[iWorkersСhanges - 1];
                Workers.updateOne(
                {_id: iDWorkersInDb[iWorkersСhanges - 1]},
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

router.get("/workers-names", async (req, res) => {
    try {
        const workers = await Workers.find();

        let workersNames = [];

        workers.forEach(elem => {
            if (elem.name !== "Удален") {
                workersNames.push(
                    {
                        name: elem.name,
                        id: elem.id
                    }
                )     
            }
        });

        res.json(workersNames);
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

router.post("/remove-worker", async (req, res) => {
    try {
        const workerOnDeletion = req.body;
        let endMonth = null;
        // console.log({name: workerOnDeletion.name, id: workerOnDeletion.id})
        if (workerOnDeletion.workEndMonth === "Январь") endMonth = 0;
        if (workerOnDeletion.workEndMonth === "Февраль") endMonth = 1;
        if (workerOnDeletion.workEndMonth === "Март") endMonth = 2;
        if (workerOnDeletion.workEndMonth === "Апрель") endMonth = 3;
        if (workerOnDeletion.workEndMonth === "Май") endMonth = 4;
        if (workerOnDeletion.workEndMonth === "Июнь") endMonth = 5;
        if (workerOnDeletion.workEndMonth === "Июль") endMonth = 6;
        if (workerOnDeletion.workEndMonth === "Август") endMonth = 7;
        if (workerOnDeletion.workEndMonth === "Сентябрь") endMonth = 8;
        if (workerOnDeletion.workEndMonth === "Октябрь") endMonth = 9;
        if (workerOnDeletion.workEndMonth === "Ноябрь") endMonth = 10;
        if (workerOnDeletion.workEndMonth === "Декабрь") endMonth = 11;

        if (workerOnDeletion.workEndYear && workerOnDeletion.workEndMonth) {
            targetWorker = await Workers.find({name: workerOnDeletion.name, id: workerOnDeletion.id});

            let doesntExistMonths = [];

            let i = endMonth;
    
            while (i <= 11) {
                doesntExistMonths.push({name: "DoesntExist"})
                i++
            };

            if (Number(workerOnDeletion.workEndYear) === 2021) {
                targetWorker[0].years.splice(1, 1);

                if (endMonth === 0) {
                    targetWorker[0].name = "Удален"
                }

                targetWorker[0].years[0].months.splice(endMonth, doesntExistMonths.length, ...doesntExistMonths);
                await Workers.updateOne({name: workerOnDeletion.name, id: workerOnDeletion.id}, targetWorker[0], {upsert: false});
            }


            console.log(targetWorker[0].years[0].months)
        } else {
            console.log({name: workerOnDeletion.name, id: workerOnDeletion.id})
            // await Workers.remove({name: workerOnDeletion.name, id: workerOnDeletion.id});
        }
        res.json({message: "Успешно удален"});
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

module.exports = router;