//Obtención del modelo
const Animal = require('../models/animal.model');

//POST Animal
module.exports.createAnimal = (request,response) => {
    const {animal, age, type} = request.body;
    Animal.create({animal, age, type})
        .then(animal => response.status(200).json({insertedAnimal: animal, msg:"Sucessful animal creation"}))
        .catch(err => response.status(400).json(err))
}

//GET Animal by type
module.exports.getAnimalsByType = (request, response) => {
    const { type } = request.params;
    // Recupera todos los animales que coincidan con el tipo especificado
    Animal.find({ type: type, assigned: false })
        .then(retrievedAnimals => {
            if(retrievedAnimals.length === 0) {
                return response.status(404).json({ message: "No animals found with the specified type." });
            }
            response.status(200).json(retrievedAnimals);
        })
        .catch(err => response.status(400).json(err));
}

//GET average Animal by Pen
module.exports.getAverage = (request, response) => {
    const { pen } = request.params;
    // Recupera todos los animales que coincidan con el tipo especificado
    Animal.find({ pen_id: pen})
        .then(retrievedAnimals => {
            if(retrievedAnimals.length === 0) {
                return response.status(404).json({ message: "No animals found with the specified type." });
            }

            // Calcular la suma de las edades
            const totalAge = retrievedAnimals.reduce((sum, animal) => sum + animal.age, 0);

            // Calcular el promedio
            const averageAge = totalAge / retrievedAnimals.length;
            response.status(200).json(averageAge);
        })
        .catch(err => response.status(400).json(err));
}

//GET Animal by Pen
module.exports.getAnimalsByPen = (request, response) => {
    const { pen } = request.params;
    // Recupera todos los animales que coincidan con el tipo especificado
    Animal.find({ pen_id: pen })
        .then(retrievedAnimals => {
            if(retrievedAnimals.length === 0) {
                return response.status(404).json({ message: "No animals found with the specified type." });
            }
            response.status(200).json(retrievedAnimals);
        })
        .catch(err => response.status(400).json(err));
}

//PUT Animal
module.exports.updateAnimal = (request,response) => {
    //Actualiza un animal de la consulta de acuerdo al ID ingresado en la URL
    Animal.findOneAndUpdate({_id: request.params.id},request.body,{new:true})
        .then(updateAnimal => response.status(200).json(updateAnimal))
        .catch(err => response.status(400).json(err))
}