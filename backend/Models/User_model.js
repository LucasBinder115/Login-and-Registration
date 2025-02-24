const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String, // "String" com S maiúsculo
        required: true, // "required" com dois pontos e valor booleano
        lowercase: true, // "lowercase" com dois pontos e valor booleano
        unique: true // "unique" com dois pontos e valor booleano
    },
    password: {
        type: String, // "String" com S maiúsculo
        required: true // "required" com dois pontos e valor booleano
    }
});

const User = mongoose.model("User", UserSchema); // Nome do modelo em maiúsculo e schema correto

module.exports = User; // Exporta o modelo para uso em outros arquivos