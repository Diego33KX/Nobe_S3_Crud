const mongoose  = require("mongoose")
const Schema = mongoose.Schema

const contactoSchema = new Schema ({
    nombre: String,
    edad: Number,
    telefono: Number,
    imagen: String
}, {versionKey:false})

module.exports = mongoose.model('contactos', contactoSchema)
