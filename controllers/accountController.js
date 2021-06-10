const accountModel = require('../models/accountModel');

class accountController {

    async listar(req, res){
        const resultado = await accountModel.find({});
        res.status(200).json(resultado);
    }
    async salvar(req, res){
        const max = await accountModel.findOne({}).sort({codigo: -1});
        let account = req.body;
        account.codigo = max == null ? 1 : max.codigo + 1;
        const resultado = await accountModel.create(account);
        res.status(201).json(resultado);   
    }

};

module.exports = new accountController();