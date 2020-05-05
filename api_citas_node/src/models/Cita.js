const { Schema, model } = require('mongoose');

const CitaSchema = new Schema ({
    name: { type: String, requiered: true },
    lastname: { type: String, requiered: true },
    id_number: { type: Number, requiered: true, unique: true },
    birth: { type: String, requiered: true },
    city: { type: String, requiered: true },
    neighborhood: { type: String, requiered: true },
    phone: { type: Number, requiered:true },
    user: { type: String, required: true }
}, {
    timestamps: true
})

module.exports = model('Cita', CitaSchema);