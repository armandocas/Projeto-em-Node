const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true }, //lowercase, para letras minusculas
    password: { type: String, required: true, selec: false },//select: false é usado para que ñ seja mostrado a senha do usuário =D
    created: { type: Date, default: Date.now }//para preencher automaticamente
});

UserSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password')) return next();

    user.password = await bcrypt.hash(user.password, 10);
    return next();

});

module.exports = mongoose.model('User', UserSchema);