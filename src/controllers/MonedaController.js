import MonedaModel from '../models/MonedaModel.js';

class MonedaController {
  static async getAll(req, res) {
    try {
      const monedas = await MonedaModel.getAll();
      res.json(monedas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateTasa(req, res) {
    try {
      const { codigo } = req.params;
      const { tasa_cambio } = req.body;
      await MonedaModel.updateTasa(codigo, tasa_cambio);
      res.json({ message: `Tasa de cambio para ${codigo} actualizada` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default MonedaController;
