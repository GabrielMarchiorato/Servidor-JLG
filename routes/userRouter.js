const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../auth/auth');

router.get('/', auth.autorizar);
router.get('/', userController.listar);
router.get('/:codigo', userController.buscarPorCodigo);
router.post('/', userController.salvar);
router.post('/login', userController.login);
router.put('/:codigo', userController.atualizar);
router.delete('/:codigo', userController.excluir);

module.exports = router;
