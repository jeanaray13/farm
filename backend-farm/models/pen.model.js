//Importación de MongoDB
const mongoose = require('mongoose');

//Creación del esquema
/**
 * @openapi
 * components:
 *   schemas:
 *     Pen:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name: 
 *           type: string
 *           example: Corral de animales
 *         capacity: 
 *           type: number
 *           example: 10 
 *         animals: 
 *           type: array
 *           items: 
 *             type: string
 *             example: [61dbae02-c147-4e28-863c-db7bd402b2a5, 61dbae02-c147-4e28-863c-db7bd402b2a6, ...]
 */
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
        ref: 'Animal',
    }]
});

//Definición del modelo
const Pen = mongoose.model('Pen', PenScheme);
module.exports = Pen;