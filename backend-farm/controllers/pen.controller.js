//Obtención del modelo
const Pen = require('../models/pen.model');

//POST Pen
module.exports.createPen = (request,response) => {
    const {name,capacity,animals} = request.body;
    Pen.create({name,capacity,animals})
        .then(pen => response.status(200).json({insertedPen: pen, msg:"Sucessful pen creation"}))
        .catch(err => response.status(400).json(err))
}

//GET ALL Pen
module.exports.getAllPens = (_,response) => {
    //Recupera todos los corrales de la consulta
    Pen.find({})
        .then(retrievedPen => response.status(200).json(retrievedPen))
        .catch(err => response.status(400).json(err))
}

//PUT Pen
module.exports.updatePen = (request,response) => {
    //Actualiza un corral de la consulta de acuerdo al ID ingresado en la URL
    Pen.findOneAndUpdate({_id: request.params.id},request.body,{new:true})
        .then(updatePen => response.status(200).json(updatePen))
        .catch(err => response.status(400).json(err))
}