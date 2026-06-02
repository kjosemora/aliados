import express from 'express';
const router = express.Router();

// PLACEHOLDER - FASE FUTURA
router.get('/', (req, res) => res.json({ message: 'Módulo de Ventas - Próximamente' }));
router.post('/pos', (req, res) => res.json({ message: 'Procesar venta POS' }));
router.post('/factura', (req, res) => res.json({ message: 'Generar factura convencional' }));

export default router;
