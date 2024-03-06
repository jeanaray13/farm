const mongoose = require('mongoose');

const db_name = 'farm_db'
mongoose.connect(`mongodb://127.0.0.1:27017/${db_name}`,{
    /*Variables para evitar validaciones y controles de accesos de MongoDB */
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log(`Establecida la conexión a la base de datos ${db_name}`))
.catch(err => console.log("Algo impide conectarse a la base de datos",err))