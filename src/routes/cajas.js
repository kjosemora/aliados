import express from 'express';
const router = express.Router();

// PLACEHOLDER - FASE FUTURA
router.get('/', (req, res) => res.json({ message: 'Módulo de Cajas - Próximamente' }));
router.post('/apertura', (req, res) => res.json({ message: 'Apertura de caja' }));
router.post('/cierre', (req, res) => res.json({ message: 'Cierre de caja' }));

export default router;
