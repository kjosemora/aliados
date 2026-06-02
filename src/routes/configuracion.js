import express from 'express';
import ConfigController from '../controllers/ConfigController.js';
import MonedaController from '../controllers/MonedaController.js';
import UsuarioController from '../controllers/UsuarioController.js';
import RolController from '../controllers/RolController.js';

const router = express.Router();

// EMPRESA CONFIG
router.get('/', ConfigController.get);
router.put('/', ConfigController.update);

// MONEDAS
router.get('/monedas', MonedaController.getAll);
router.put('/monedas/:codigo', MonedaController.updateTasa);

// USUARIOS
router.get('/usuarios', UsuarioController.getAll);
router.post('/usuarios', UsuarioController.create);
router.put('/usuarios/:codigo', UsuarioController.update);

// ROLES
router.get('/roles', RolController.getAll);
router.post('/roles', RolController.create);

export default router;
