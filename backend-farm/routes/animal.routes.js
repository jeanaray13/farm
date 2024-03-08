//Llamada al controlador
const AnimalController = require('../controllers/animal.controller');

//Creación de las rutas de acuerdo a los métodos del controlador
module.exports = function(app){
    app.post('/api/animal/new', AnimalController.createAnimal);
    app.get('/api/animals', AnimalController.getAllAnimals);
    app.put('/api/animal/:id', AnimalController.updateAnimal);
    app.get('/api/animalsType/:type', AnimalController.getAnimalsByType);
    app.get('/api/animalsPen/:pen', AnimalController.getAnimalsByPen);
    app.get('/api/animalsPen/average/:pen', AnimalController.getAverage);
}