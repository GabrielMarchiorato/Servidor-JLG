const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
    {
        codigo: { type: Number, required: [true, "Obrigatório dado -> Código <- !"]},
        cartao: { type: String, required: [true, "Obrigatório dado -> Cartão <- !"]},
        titulo: { type: String, required: [true, "Obrigatório dado -> Título <- !"]},
        descUm: { type: String, required: [true, "Obrigatório dado -> Descrição Um <- !"]},
        descDois: { type: String, required: [true, "Obrigatório dado -> Descrição Dois <- !"]},
        descTres: { type: String, required: [true, "Obrigatório dado -> Descrição Tres <- !"]},
        descQuatro: { type: String, required: [true, "Obrigatório dado -> Descrição Quatro <- !"]}
    }
);

module.exports = accountSchema;