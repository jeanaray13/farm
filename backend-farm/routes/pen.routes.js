//Llamada al controlador
const PenController = require('../controllers/pen.controller');

//Creación de las rutas de acuerdo a los métodos del controlador
module.exports = function(app){
    app.post('/api/pen/new', PenController.createPen);
    app.get('/api/pens', PenController.getAllPens);
    app.put('/api/pen/:id', PenController.updatePen);
}