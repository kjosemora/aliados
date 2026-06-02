import UsuarioModel from '../models/UsuarioModel.js';
import bcrypt from 'bcryptjs';

class UsuarioController {
  static async getAll(req, res) {
    try {
      const usuarios = await UsuarioModel.getAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { codigo, descripcion, clave, correo, rol_id, estado } = req.body;
      const hashedClave = await bcrypt.hash(clave, 10);
      await UsuarioModel.create({
        codigo, descripcion, clave: hashedClave, correo, rol_id, estado
      });
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { codigo } = req.params;
      await UsuarioModel.update(codigo, req.body);
      res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UsuarioController;
