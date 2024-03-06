//Llamada al controlador
const AccountController = require('../controllers/account.controller');

//Creación de las rutas de acuerdo a los métodos del controlador
module.exports = function(app){
    app.post('/api/account/new', AccountController.createAccount);
    app.get('/api/accounts', AccountController.getAllAccounts);
    app.get('/api/account', AccountController.getAccount);
    app.post('/api/account/login', AccountController.verifyAccount);
}