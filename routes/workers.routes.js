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
        const workers = req.body;
        // console.log(workers)

        // const user = new User({email, password: hashedPassword});

        // await Workers.updateMany({"years.id": 1}, {$set: {workers}});

        await workers.forEach(function(item) {
                Workers.replaceOne(
                    {"years.id": 1},              // критерий фильтрации
                    {item},     // параметр обновления
                    function(err, result){
                            
                        console.log(result);
                        console.log(err);
                    }
                );

            console.log(item)
          });

        // await Workers.updateOne(
        //     {},              // критерий фильтрации
        //     {workers},     // параметр обновления
        //     function(err, result){
                      
        //         console.log(result);
        //         console.log(err);
        //     }
        // );



        res.json({workers})


    } catch (e) {
        res.status(500).json(e.message)
    }
})


module.exports = router;