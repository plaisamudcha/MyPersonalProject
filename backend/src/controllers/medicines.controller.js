import medicinesService from "../services/medicines.service.js";
import createError from "../utils/create-error.util.js";

const medicinesController = {
  getAllMedicines: async (req, res, next) => {
    try {
      const medicines = await medicinesService.getAllMedicines();
      res.json({ medicines });
    } catch (error) {
      next(error);
    }
  },
  getMedicineById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const medicine = await medicinesService.getMedicineById(id);
      if (!medicine) createError(400, "Medicine not found");
      res.json({ medicine });
    } catch (error) {
      next(error);
    }
  },
  createMedicine: async (req, res, next) => {
    try {
      const { name, description, pricePerUnit, form } = req.body;
      await medicinesService.createMedicine(
        name,
        description,
        pricePerUnit,
        form
      );
      res.json({ message: "Create medicine success" });
    } catch (error) {
      next(error);
    }
  },
  updateMedicineById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, stock, pricePerUnit, form } = req.body;
      const medicine = await medicinesService.getMedicineById(id);
      if (!medicine) createError(400, "Medicine not found!!!");
      await medicinesService.updateMedicineById(
        id,
        name,
        description,
        pricePerUnit,
        form
      );
      res.json({ message: "Update medicine success" });
    } catch (error) {
      next(error);
    }
  },
};

export default medicinesController;
