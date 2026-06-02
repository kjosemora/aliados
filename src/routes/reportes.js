import express from 'express';
const router = express.Router();

// PLACEHOLDER - FASE FUTURA
router.get('/inventario', (req, res) => res.json({ message: 'Reporte de inventario' }));
router.get('/ventas', (req, res) => res.json({ message: 'Reporte de ventas' }));

export default router;
