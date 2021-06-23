require("./mongodb");
const mongoose = require('mongoose');

const accountModel = require("../models/accountModel");
const accounts = require("./planos.json");

const userModel = require("../models/userModel");
const usuarios = require("./usuarios.json");

async function carregarDados() {
    try {
        await accountModel.deleteMany({});
        for (const account of accounts) {
            await accountModel.create(account);
        }
        console.log("Carga de contas concluída!");

        await userModel.deleteMany({});
        for (const usuario of usuarios) {
            await accountModel
                .findOne({ codigo: usuario.accountId })
                .then(accountId => {
                    usuario.accountId= accountId._id;
                    console.log(usuario.accountId);
                    return usuario;
                }).then(async (usuario) => {
                    await userModel.create(usuario);
                });
        }
        console.log("Carga de usuarios concluída!");
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}
carregarDados();