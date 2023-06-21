//Migracion 
const {Schema, model}=require('mongoose')

const UsuarioSchema= Schema({
    //se define tipos de datos
    nro_identificacion:{
        unique:[true, 'El número de identificación: {VALUE} ya existe'],
        type: String,
        required: [true,'El número de identificación es requerido']
    },
    email:{
        unique:[true, 'El email: {VALUE} ya existe'],
        type: String,
        required: [true,'El campo email es requerido']
    },
    nombre:{
        type: String,
        required: [true,'El campo nombre es requerido']
    },
    password:{
        type: String,
        required:[true, 'El password es requerido'],
        minlength: [4, 'El password debe tener minimo 4 caracteres'] 
    },
    estado:{
        type: Boolean,
        required:[true, 'El estado es obligatorio'],
        default:true,
    }
})
//este es el nombre del objeto Usuario
module.exports = model('Usuario', UsuarioSchema)//Exportar el modelo

