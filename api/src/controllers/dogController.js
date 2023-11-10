const axios = require("axios");
const { BD_APP_KEY } = process.env;
const { Dog, Temperaments} = require("../db")

const imageDog = async (id) => {
    try {
      const imageId = (
        await axios.get(
          `https://api.thedogapi.com/v1/images/search?breed_ids=${id}&include_breeds=true`
        )
      ).data;
      if (imageId && imageId.length > 0) {
        const imageURL = imageId[0].url;
        return imageURL;
      } else {
        throw new Error("No se encontraron imágenes para este perro.");
      }
    } catch (error) {
      console.error("Error al obtener la URL de la imagen del perro", error);
    }
  };

  const cleanDogs = async (arr) => {
    const cleanedDogs = await Promise.all(
      arr.map(async (elem) => {
        const temperamentArray = elem.temperament
          ? elem.temperament.split(", ")
          : [];
        const weight = elem.weight.metric.split(" ");
        const height = elem.height.metric.split(" ");
        const imageDogI = await imageDog(elem.id);
        return {
          name: elem.name,
          heightMin: height[0],
          heightMax: height[height.length - 1],
          weightMin: weight[0],
          weightMax: weight[weight.length - 1],
          id: elem.id,
          yearsOfLife: elem.life_span,
          image: imageDogI,
          temperament: temperamentArray,
          created: false,
        };
      })
    );
    return cleanedDogs;
  };

  const getDogsApi = async () => {
    const dogsApi = (
      await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${BD_APP_KEY}`)
    ).data;
  
    const cleandogsApi = cleanDogs(dogsApi);
    if (cleandogsApi.temperament && cleandogsApi.temperament.length) {
      for (const temperamentId of cleandogsApi.temperament) {
        const temp = await Temperaments.findByPk(temperamentId);
        if (temp) {
          await newDog.addTemperament(temp);
        }
      }
    }
    return cleandogsApi;
  };


  const getAllDogs = async () => {
    const dbDogs = await  Dog.findAll()
    const apiDog = await getDogsApi()
    return [...dbDogs, ...apiDog]
    
  }


  const getDogsId = async (id, source) => {
    const dogs = await getDogsApi();
    const apiDogs = dogs.find((dog) => dog.id === Number(id));
    const dog = source === "api" ? apiDogs : await Dog.findByPk(id);
    return dog;
  };


//   const dogCreate = async (
//                     name,
//                     image,
//                     heightMin,
//                     heightMax,
//                     weightMin,
//                     weightMax,
//                     yearsOfLife,
//                     temperament) => {
//     const newdog = await Dog.create({
//         name,
//         image,
//         heightMin,
//         heightMax,
//         weightMin,
//         weightMax,
//         yearsOfLife,
//         temperament
//     })
//     return newdog

//   }

  module.exports ={
    getAllDogs,
    getDogsId,
  }