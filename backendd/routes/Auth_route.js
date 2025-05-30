const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');
const autorizar = require('../middlewares/autorizar');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/refresh', authController.refresh);

router.post('/logout', authController.logout);

// // Exemplo de rota protegida com autenticação
// router.get('/perfil', auth, (req, res) => {
//   res.json({ user: req.user });
// });

// // Exemplo de rota protegida com permissão
// router.get('/admin', auth, autorizar('admin'), (req, res) => {
//   res.json({ message: "Acesso autorizado para admin" });
// });

module.exports = router;
