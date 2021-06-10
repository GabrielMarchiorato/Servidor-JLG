const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.listar);
// router.get('/', function (req, res, next) {
//   res.json(usuarios);
// });

router.get('/:codigo', userController.buscarPorCodigo);
// router.get('/:codigo', function (req, res, next) {
//   let id = req.params.codigo;
//   let usuario = usuarios[getIndex(id)];
//   res.json(usuario);
// });

router.post('/', userController.salvar);
// router.post('/', function (req, res, next) {
//   let usuario = req.body;
//   usuario.id = gerarId();
//   usuarios.push(usuario);
//   res.status(204).send(`POST do usuário: ${usuario.nome}`);
// });

router.put('/:codigo', userController.atualizar);
// router.put('/:codigo', function (req, res, next) {
//   let id = req.params.codigo;
//   let usuario = req.body;
//   usuarios.splice(getIndex(id), 1, usuario);
//   res.status(204).send(usuario);
// });

router.delete('/:codigo', userController.excluir);
// router.delete('/:codigo', function (req, res, next) {
//   let id = req.params.codigo;
//   usuarios.splice(getIndex(id), 1);
//   res.status(204).send();
// });

module.exports = router;
