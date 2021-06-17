const mongoose = require('mongoose');

const usuarioLogadoSchema = new mongoose.Schema(
    {
        usuarioId = {type: mongoose.Schema.Types.ObjectId, ref: 'usuario'}
    }
);

module.exports = mongoose.model('usuarioLogado', usuarioLogadoSchema);

