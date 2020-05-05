const { Router } = require('express');
const router = Router();

const { signin, signup, logout, findById, prueba } = require('../controllers/users.controller');

router.post('/users/signup', signup);

router.post('/users/signin', signin);

router.get('/users/logout', logout);

router.get('/users/prueba', prueba);

router.get('/users/:id', findById);

module.exports = router;