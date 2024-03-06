//Importación de MongoDB
const mongoose = require('mongoose');

//Creación del esquema
const AnimalScheme = new mongoose.Schema({
    animal:{
        type: String,
        required: [true, "Animal is required"]
    },
    age:{
        type: Number,
        required: [true, "Age is required"]
    },
    type:{
        type: String,
        required: [true, "Type is required"]
    },
    pen_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pen'
    }
});

//Definición del modelo
const Animal = mongoose.model('Animal', AnimalScheme);
module.exports = Animal;