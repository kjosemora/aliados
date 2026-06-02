import ConfigModel from '../models/ConfigModel.js';

class ConfigController {
  static async get(req, res) {
    try {
      const config = await ConfigModel.getConfig();
      res.json(config);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      await ConfigModel.updateConfig(req.body);
      res.json({ message: 'Configuración actualizada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ConfigController;
