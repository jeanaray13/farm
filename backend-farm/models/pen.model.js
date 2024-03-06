//Importación de MongoDB
const mongoose = require('mongoose');

//Creación del esquema
const PenScheme = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Animal pen is required"]
    },
    capacity:{
        type: Number,
        required: [true, "Capacity is required"]
    },
    animals:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal'
    }]
});

//Definición del modelo
const Pen = mongoose.model('Pen', PenScheme);
module.exports = Pen;