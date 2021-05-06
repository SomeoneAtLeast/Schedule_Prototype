const {Router} = require("express");
const Workers = require("../models/Workers");
const router = Router();

router.get("/workers", async (req, res) => {
    try {
        const currentYear = Number(req.headers.year);
        const workers = await Workers.find({"years.id": currentYear}, {"years.$": 1, name: 1, id: 1});
        // console.log(workers)
        res.json(workers);
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

router.post("/workers-update", async (req, res) => {
    try {
        const currentYear = Number(req.headers.year);
        const currentMonth = Number(req.headers.month);
        console.log(currentYear , currentMonth)
        const workers = req.body;
        let workersСhanges = []
        workers.forEach(elem => {
            workersСhanges.push(
                elem.years[0].months[currentMonth - 1].days
            )
        });
        // // console.log(workers)

        // // const user = new User({email, password: hashedPassword});

        // // await Workers.updateMany({"years.id": 1}, {$set: {workers}});

        // await workers.forEach(function(item) {
        //         Workers.replaceOne(
        //             {"years.id": 1},              // критерий фильтрации
        //             {item},     // параметр обновления
        //             function(err, result){
                            
        //                 console.log(result);
        //                 console.log(err);
        //             }
        //         );

        //     console.log(item)
        //   });


        // const updateWorkers = () => {
        //     const updatePath = `years.${currentYear - 1}.months.${currentMonth - 1}.days`;
        //     const target = {};
        //     target[updatePath] = workersСhanges[i];
        //     // console.log(target)
    
        //         Workers.updateOne(
        //         {id: 1},              // критерий фильтрации
        //         target,     // параметр обновления
        //         function(err, result){
                          
        //             // console.log(result);
        //             // console.log(err);
        //         }
        //     );
        // }

        let i = 1;

        workersСhanges.forEach(elem => {
            console.log(i)
            const updatePath = `years.${currentYear - 1}.months.${currentMonth - 1}.days`;
            const target = {};
            target[updatePath] = workersСhanges[i - 1];
            // console.log(target)
    
                Workers.updateOne(
                {id: i},              // критерий фильтрации
                target,     // параметр обновления
                function(err, result){
                          
                    // console.log(result);
                    // console.log(err);
                }
            );
                i++
        });

        // const updatePath = `years.${currentYear - 1}.months.${currentMonth - 1}.days`;
        // const target = {};
        // target[updatePath] = workersСhanges[0];
        // // console.log(target)

        // await Workers.updateOne(
        //     {id: 1},              // критерий фильтрации
        //     target,     // параметр обновления
        //     function(err, result){
                      
        //         // console.log(result);
        //         // console.log(err);
        //     }
        // );



        res.json(workersСhanges)


    } catch (e) {
        res.status(500).json(e.message)
    }
})


module.exports = router;