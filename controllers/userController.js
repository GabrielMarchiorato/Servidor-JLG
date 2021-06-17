const userModel = require('../models/userModel');
const auth = require('../auth/auth');
const bcryptjs = require('bcryptjs');

class userController {

    async login(req, res){
        const { email, senha } = req.body;
        const usuario = await userModel.findOne({'email': email}).select('+senha');
        
        if(!usuario){
            res.status(400).send({error: 'Usuário não encontrado!'});
        }

        if(!await bcryptjs.compare(senha, usuario.senha)){
            res.status(400).send({error: 'Senha inválida!'});
        }

        const token = auth.gerarToken(usuario);
        res.status(201).json({id: usuario._id, nome: usuario.nome, email: usuario.email, token: token});  
    }



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
        let user = req.body;
        const max = await userModel.findOne({}).sort({codigo: -1});
        user.codigo = max == null ? 1 : max.codigo + 1;
        
        if(await userModel.findOne({'email': user.email})) {
            res.status(400).send({error: 'Usuário já cadastrado!'});  
        }  

        const resultado = await userModel.create(user);
        const token = auth.gerarToken(resultado);
        res.status(201).json({id: user._id, nome: user.nome, email: user.email, token: token});   
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