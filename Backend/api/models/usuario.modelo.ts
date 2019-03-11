const mongoose = require("mongoose")
const esquema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: {
    type: String,
    required: true,
    unique: true,
    email: true,
    trim: true,
    lowerCase: true
  },
  contrasena: {
    type: String,
    required: true,
    minlength: 4,
    trim: true
  } , refreshToken: {
    type: String,
    required: true
  }
})

const Usuario = mongoose.model("Usuario", esquema)

export default Usuario