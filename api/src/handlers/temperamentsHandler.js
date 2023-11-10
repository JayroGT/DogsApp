const {temperamentsApi} = require('../controllers/temperamentsControler');


const getTemperamentsHandler = async (req, res) => {
    try {
        const temperaments = await temperamentsApi()
        res.status(200).json(temperaments)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports  = {getTemperamentsHandler};