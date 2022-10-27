const express = require('express')
const router = express.Router()
const { verifyFile } = require('../verify/verify');
const contactoController = require('../controllers/contactoController');
//MOSTRAR CONTACTOS
router.get('/', contactoController.mostrar)

//CREAR CONTACTO
router.post('/crear', contactoController.crear)
router.post('/upload', verifyFile, contactoController.upload)
//EDITAR CONTACTO
router.post('/editar',contactoController.editar)

//BORRAR CONTACTO
router.get('/borrar/:id', contactoController.borrar)
module.exports = router