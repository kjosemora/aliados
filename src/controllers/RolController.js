import RolModel from '../models/RolModel.js';

class RolController {
  static async getAll(req, res) {
    try {
      const roles = await RolModel.getAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { codigo, descripcion } = req.body;
      await RolModel.create(codigo, descripcion);
      res.status(201).json({ message: 'Rol creado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default RolController;
