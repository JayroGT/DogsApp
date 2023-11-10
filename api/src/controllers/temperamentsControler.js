const axios = require('axios')
const {BD_APP_KEY} = process.env
const {Temperaments} = require('../db')

const temperamentsApi = async () => {
    const temperApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${BD_APP_KEY}`)).data
    const temperaments = [...new Set(temperApi.flatMap((elem) => elem.temperament?.split(',').map((temp) => temp.trim())).filter(Boolean))] //cadena de string >> array
    const temper = temperaments.map(temper=>{
        return Temperaments.findOrCreate({where: {name : temper}})  // xcada temp >> busca o crea
    })
    await Promise.all(temper)
    const allTemperDb = await Temperaments.findAll()

    return allTemperDb
} 

module.exports = {temperamentsApi}





