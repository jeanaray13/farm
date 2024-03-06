//Obtención del modelo
const Account = require('../models/account.model');

//Importación de Bcrypt
const bcrypt = require('bcrypt');

//POST Account
module.exports.createAccount = (request, response) => {
    //Obtiene las variables de la solicitud
    const { firstName, lastName, email, password, confirmPassword } = request.body;
    Account.create({firstName, lastName, email, password, confirmPassword})
        .then(account => response.status(200).json({insertedAccount: account, msg:'Sucessful creation'}))
        .catch(err => response.status(400).json(err));
}

//GET ALL Accounts
module.exports.getAllAccounts = (_,response) => {
    //Recupera todas las cuentas de la consulta
    Account.find({})
        .then(retrievedAccounts => response.status(200).json(retrievedAccounts))
        .catch(err => response.status(400).json(err))
}

//GET BY ID Account
module.exports.getAccount = (request,response) => {
    //Recupera un usuario de la consulta de acuerdo al ID ingresado en la URL
    Account.findOne({_id: request.params.id})
        .then(account => response.status(200).json(acocunt))
        .catch(err => response.status(400).json(err))
}

//Verify Account
module.exports.verifyAccount = (request,response) => {
    //Obtiene las variables de la solicitud
    const {email, password} = request.body;

    Account.findOne({email})
        .then(account => {
            //Si la cuenta no existe
            if(!account){
                return response.status(400).json({msg: "Account not exist"})
            }
            //Comparar la contraseña
            bcrypt.compare(password, account.password, (err,data) =>{
                if(err){
                    throw err
                }
                if(data){
                    return response.status(200).json({msg: "Login Success"})
                }
                else{
                    return response.status(400).json({msg: "Invalid Password"})
                }
            })
        })
        .catch(err => response.status(400).json(err))
}