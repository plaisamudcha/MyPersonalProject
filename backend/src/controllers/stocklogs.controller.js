import medicinesService from "../services/medicines.service.js";
import stocksService from "../services/stocklogs.service.js";
import createError from "../utils/create-error.util.js";

const stocksController = {
  getAllStocks: async (req, res, next) => {
    try {
      const { page, limit, name } = req.query;
      const stocks = await stocksService.getAllStocks(
        Number(page),
        Number(limit),
        name
      );
      res.json({ stocks });
    } catch (error) {
      next(error);
    }
  },
  getStocksByMedicineId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const stockInMedicines = await stocksService.getStocksByMedicineId(id);
      if (!stockInMedicines) createError(400, "Medicine not found!!!");
      res.json({ stockInMedicines });
    } catch (error) {
      next(error);
    }
  },
  createStock: async (req, res, next) => {
    try {
      const { change, reason, medicineId } = req.body;
      const medicine = await medicinesService.getMedicineById(medicineId);
      if (!medicine) createError(400, "Medicine not found!!!");
      if (-change > medicine.stock)
        createError(400, "Your medicine stock not enough");
      await stocksService.editMedicineStock(medicine.stock, change, medicineId);
      await stocksService.createStock(change, reason, medicineId);
      res.json({ message: "Create stock success" });
    } catch (error) {
      next(error);
    }
  },
};

export default stocksController;
