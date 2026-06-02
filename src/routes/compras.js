import express from 'express';
const router = express.Router();

// PLACEHOLDER - FASE FUTURA
router.get('/', (req, res) => res.json({ message: 'Módulo de Compras - Próximamente' }));
router.post('/orden', (req, res) => res.json({ message: 'Crear orden de compra' }));

export default router;
