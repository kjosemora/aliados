import express from 'express';
const router = express.Router();

/**
 * @route   GET /api/v1/configuracion
 * @desc    Obtener configuración general de la empresa
 * @access  Private/Admin
 */
router.get('/', (req, res) => {
    res.json({ message: 'Obtener configuración de la empresa' });
});

/**
 * @route   PUT /api/v1/configuracion
 * @desc    Actualizar configuración de la empresa
 * @access  Private/Admin
 */
router.put('/', (req, res) => {
    res.json({ message: 'Configuración actualizada' });
});

/**
 * @route   GET /api/v1/configuracion/monedas
 * @desc    Listar monedas y tasas
 */
router.get('/monedas', (req, res) => {
    res.json({ message: 'Listado de monedas' });
});

export default router;
