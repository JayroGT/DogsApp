const {Router} = require("express")
const dogsRouter = Router()
const {
    createDogHandler,
    getDogsIdHandler,
    getDogsHandler
    } = require('../handlers/dogHandler');


dogsRouter.get("/", getDogsHandler)

dogsRouter.get("/:id", getDogsIdHandler)

dogsRouter.post("/", createDogHandler)

module.exports = dogsRouter;
