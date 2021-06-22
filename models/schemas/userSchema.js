const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const userSchema = new mongoose.Schema(
    {
        codigo: {
            type: Number,
            required: [true, "Obrigatorio dado -> Codigo <- !"]
        },
        nome: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true,
            unique: true
        },
        renda: {
            type: String,
            required: [true, "Obrigatorio dado -> Renda <- !"],
            enum: {
                values: ['menos de 3k', 'igual a 3k', 'mais de 4,20k'],
                message: 'Esta opcao nao é suportada'
            }
        },
        email: {
            type: String,
            required: [true, "Obrigatorio dado -> Email <- !"],
            unique: true,
            lowercase: true
        },
        senha: {
            type: String,
            required: [true, "Obrigatorio dado -> Senha <- !"],
            select: false
        },
        privilegio: String,
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'account'
        },
        dtaCriacao: {
            type: Date,
            default: Date.now
        },
        token: {
            type: String,
            select: false
        }
    }
);

userSchema.pre('save', async function (next) {
        const hash = await bcryptjs.hash(this.senha, 10);
        this.senha = hash;
    next();
});

module.exports = userSchema;