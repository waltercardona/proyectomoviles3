const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new Schema ({
    name: { type: String, requiered: true },
    email: { type: String, requiered: true, unique: true },
    password: { type: String, requiered:true }
}, {
    timestamps: true
});

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password) // this.password toma el valor de password de la base de datos almacenado en UserSchema en la parte superior y lo compara con el password ingresado por el usuario.
}

module.exports = model('User', UserSchema);