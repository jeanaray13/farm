//Importación de MongoDB
const mongoose = require('mongoose');

//Creación del esquema
/**
 * @openapi
 * components:
 *   schemas:
 *     Animal:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         animal: 
 *           type: string
 *           example: pig
 *         age: 
 *           type: number
 *           example: 2 
 *         type: 
 *           type: string
 *           example: peligroso/noPeligroso
 *         assigned: 
 *           type: boolean
 *           example: false
 *         pen_id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6  
 */
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
    assigned:{
        type: Boolean,
        default: false
    },
    pen_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pen',
        default: null
    }
});

//Definición del modelo
const Animal = mongoose.model('Animal', AnimalScheme);
module.exports = Animal;