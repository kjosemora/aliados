import express from 'express';
const router = express.Router();

// ARTICULOS
router.get('/articulos', (req, res) => res.json({ message: 'Listado de artículos' }));
router.post('/articulos', (req, res) => res.json({ message: 'Artículo creado' }));
router.get('/articulos/:codigo', (req, res) => res.json({ message: 'Detalle de artículo' }));
router.put('/articulos/:codigo', (req, res) => res.json({ message: 'Artículo actualizado' }));

// CATEGORIAS
router.get('/categorias', (req, res) => res.json({ message: 'Listado de categorías' }));
router.post('/categorias', (req, res) => res.json({ message: 'Categoría creada' }));

// UNIDADES
router.get('/unidades', (req, res) => res.json({ message: 'Listado de unidades' }));

// ALMACENES
router.get('/almacenes', (req, res) => res.json({ message: 'Listado de almacenes' }));

export default router;
