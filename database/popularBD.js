require("./mongodb");
const mongoose = require('mongoose');

const accountModel = require("../models/accountModel");
const accounts = require("./planos.json");

const userModel = require("../models/userModel");
const usuarios = require("./usuarios.json");

async function carregarDados() {
    await accountModel.deleteMany({}, async () => {
        await accounts.forEach(async (account) => {
            await accountModel.create(account);
        });
    });

    await userModel.deleteMany({}, async () => {
        await usuarios.forEach(async (usuario) => {
            await accountModel.findOne(
                { codigo: usuario.accountId },
                async (err, account) => {
                    usuario.accountId  = account._id;
                }
            );
            await userModel.create(usuario);
        });
    });
}
carregarDados ();