const userModel = require('../models/userModel');
const accountModel = require('../models/accountModel');
const auth = require('../auth/auth');
const bcryptjs = require('bcryptjs');

class userController {
    async login(req, res) {
        const { email, senha } = req.body;
        let usuario = await userModel.findOne({ 'email': email }).select('+senha');

        if (!usuario) {
            res.status(400).send({ error: 'Usuário não encontrado!' });
        }

        if (!await bcryptjs.compare(senha, usuario.senha)) {
            res.status(400).send({ error: 'Senha inválida!' });
        }
        usuario = await auth.incluirToken(usuario);
        res.status(200).json(usuario);
    }

    async listar(req, res) {
        const resultado = await userModel.find({});
        res.status(200).json(resultado);
    }

    async buscarPorCodigo(req, res) {
        const codigo = req.params.codigo;
        const resultado = await userModel.findOne({ 'codigo': codigo });
        res.status(200).json(resultado);
    }

    async salvar(req, res) {
        const user = req.body;
        await accountModel
            .findOne({ codigo: user.accountId })
            .then(accountId => {
                user.accountId = accountId._id;
            });

        const max = await userModel.findOne({}).sort({ codigo: -1 });
        user.codigo = max == null ? 1 : max.codigo + 1;

        if (await userModel.findOne({ 'email': user.email })) {
            res.status(400).send({ error: 'Usuário já cadastrado!' });
        }

        // user.token = undefined;
        const resultado = await userModel.create(user);
        const token = auth.incluirToken(resultado);
        res.status(200).json(resultado);
    }

    async atualizar(req, res) {
        const codigo = req.params.codigo;
        const _id = String((await userModel.findOne({ 'codigo': codigo }))._id);
        let usuario = await auth.gerarHash(req.body);
        await userModel.findByIdAndUpdate(String(_id), usuario);
        res.status(200).send();
    }

    async excluir(req, res) {
        const codigo = req.params.codigo;
        const _id = String((await userModel.findOne({ 'codigo': codigo }))._id);
        await userModel.findByIdAndRemove(String(_id));
        res.status(200).send("Usuário deletado!");
    }
};

module.exports = new userController();