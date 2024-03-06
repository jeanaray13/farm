//Llamada al controlador
const AnimalController = require('../controllers/animal.controller');

//Creación de las rutas de acuerdo a los métodos del controlador
module.exports = function(app){
    app.post('/api/animal/new', AnimalController.createAnimal);
    app.get('/api/animals', AnimalController.getAllAnimals);
    app.get('/api/animal/:id', AnimalController.getAnimal);
    app.put('/api/animal/:id', AnimalController.updateAnimal);
    app.delete('/api/animal/:id', AnimalController.deleteAnimal);
}