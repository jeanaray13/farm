//Importación de MongoDB
const mongoose = require('mongoose');

//Importación de Bycript
const bcrypt = require('bcrypt');

//Creación del esquema
/**
 * @openapi
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         firstName: 
 *           type: string
 *           example: Alan
 *         lastName: 
 *           type: string
 *           example: Joe 
 *         email: 
 *           type: string
 *           example: correo@ejemplo.com
 *         password: 
 *           type: string
 *           example: xxxxxx   
 */
const AccountScheme = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "First Name is mandatory"]
    },
    lastName:{
        type: String,
        required: [true, "First Name is mandatory"]
    },
    email:{
        type: String,
        required: [true, "Email is mandatory"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val), 
            message: "Invalid email"
        }
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 chars"]
    }
});

//GET & SET Confirm Password
AccountScheme.virtual('confirmPassword')
.get(()=> this.confirmPassword)
.set(value => this.confirmPassword = value);

AccountScheme.pre('validate', function(next){
    if(this.password != this.confirmPassword){
        this.invalidate('confirmPassword','Password must match!')
    }
    next();
})

AccountScheme.pre('save', function(next){
    bcrypt.hash(this.password,10)
    .then(hash => {
        this.password = hash;
        next();
    })
})

//Definición del modelo
const Account = mongoose.model('Account', AccountScheme);
module.exports = Account;