//Obtención del modelo
const Animal = require('../models/animal.model');

//POST Animal
module.exports.createAnimal = (request,response) => {
    const {animal, age, type} = request.body;
    Animal.create({animal, age, type})
        .then(animal => response.status(200).json({insertedAnimal: animal, msg:"Sucessful animal creation"}))
        .catch(err => response.status(400).json(err))
}

//GET ALL Animal
module.exports.getAllAnimals = (_,response) => {
    //Recupera todos los animales de la consulta
    Animal.find({})
        .then(retrievedAnimal => response.status(200).json(retrievedAnimal))
        .catch(err => response.status(400).json(err))
}

//GET BY ID Animal
module.exports.getAnimal = (request,response) => {
    //Recupera un animal de la consulta de acuerdo al ID ingresado en la URL
    Animal.findOne({_id: request.params.id})
        .then(animal => response.status(200).json(animal))
        .catch(err => response.status(400).json(err))
}

//PUT Animal
module.exports.updateAnimal = (request,response) => {
    //Actualiza un animal de la consulta de acuerdo al ID ingresado en la URL
    Animal.findOneAndUpdate({_id: request.params.id},request.body,{new:true})
        .then(updateAnimal => response.status(200).json(updateAnimal))
        .catch(err => response.status(400).json(err))
}

//DELETE Animal
module.exports.deleteAnimal = (request,response) => {
    Animal.deleteOne({_id: request.params.id})
        .then(deleteAnimal => response.status(200).json(deleteAnimal))
        .catch(err => response.status(400).json(err))
}