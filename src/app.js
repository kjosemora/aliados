import express from 'express';
import cors from 'cors';
import configuracionRoutes from './routes/configuracion.js';
import inventarioRoutes from './routes/inventario.js';
import ventasRoutes from './routes/ventas.js';
import comprasRoutes from './routes/compras.js';
import cajasRoutes from './routes/cajas.js';
import reportesRoutes from './routes/reportes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/configuracion', configuracionRoutes);
app.use('/api/v1/inventario', inventarioRoutes);
app.use('/api/v1/ventas', ventasRoutes);
app.use('/api/v1/compras', comprasRoutes);
app.use('/api/v1/cajas', cajasRoutes);
app.use('/api/v1/reportes', reportesRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

export default app;
