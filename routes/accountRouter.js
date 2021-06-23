const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/', accountController.listar);
router.get('/:codigo', accountController.buscarPorCodigo);
router.post('/', accountController.salvar);

module.exports = router;
