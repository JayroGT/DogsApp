const {
    getAllDogs,
    getDogsId, 
    } = require('../controllers/dogController');

const {
    Dog, 
    Temperaments
    } = require('../db');

    const getDogsHandler = async(req, res) =>{
        const {name} = req.query
        try {
            const allDogs = await getAllDogs()
            if (name){
                const result = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase())) 
                if(result.length) return res.status(200).json(result) 
            } 
                res.status(200).json(allDogs)

        }  catch   (err) {
            return res.status(400).json({error : err.message})
        }    
        
    }

    const getDogsIdHandler = async(req, res) =>{
            const {id} = req.params;
            const source = isNaN(id)?'DB':'api'

            try { 
                const dogId = await getDogsId(id, source)
                res.status(200).json(dogId)

            } catch(err){
                return res.status(400).json({error : err.message})
        }
    }

    const createDogHandler = async (req, res)=>{
            const {
                name, 
                image, 
                heightMin, 
                heightMax, 
                weightMin, 
                weightMax, 
                yearsOfLife, 
                temperament
                } = req.body 

            try {
                const newDog = await Dog.create({
                    name, 
                    image, 
                    heightMin, 
                    heightMax, 
                    weightMin, 
                    weightMax, 
                    yearsOfLife, 
                    temperament,
                    created: true
                })
                if (temperament && temperament.length) {
                    for (const temperamentName of temperament) {
                    const temp = await Temperaments.findOrCreate({
                        where: { name: temperamentName },
                        defaults: { name: temperamentName } 
                    })
                    await newDog.addTemperament(temp[0])              
                    }}
                res.status(201).json(newDog)
            } catch (error) {
                res.status(404).json({error: error.message})
            }
        }

module.exports = {
    createDogHandler,
    getDogsIdHandler,
    getDogsHandler
    }