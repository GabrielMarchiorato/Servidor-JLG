const userModel = require('../models/userModel');
const auth = require('../auth/auth');

class userController {

    async listar(req, res){
        const resultado = await userModel.find({});
        res.status(200).json(resultado);
    }
    async buscarPorCodigo(req, res){
        const codigo = req.params.codigo;
        const resultado = await userModel.findOne({'codigo': codigo});
        res.status(200).json(resultado);
    }
    async salvar(req, res){
        const max = await userModel.findOne({}).sort({codigo: -1});
        let user = req.body;
        user.codigo = max == null ? 1 : max.codigo + 1;
        const resultado = await userModel.create(user);
        res.status(201).json(resultado);   
    }
    async atualizar(req, res){
        const codigo = req.params.codigo;
        const _id = String((await userModel.findOne({'codigo': codigo}))._id);
        let usuario = req.body;
        await userModel.findByIdAndUpdate(String(_id), usuario);
        res.status(200).send();
    }
    async excluir(req, res){
        const codigo = req.params.codigo;
        const _id = String((await userModel.findOne({'codigo': codigo}))._id);
        await userModel.findByIdAndRemove(String(_id));
        res.status(200).send();
    }
};

module.exports = new userController();