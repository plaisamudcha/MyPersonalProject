import prisma from "../config/prisma.js";

const medicinesService = {
  getAllMedicines: async () => {
    return await prisma.medicine.findMany();
  },
  getMedicineById: async (id) => {
    return await prisma.medicine.findUnique({ where: { id: Number(id) } });
  },
  createMedicine: async (name, description, price, form) => {
    return await prisma.medicine.create({
      data: { name, description, pricePerUnit: price, form },
    });
  },
  updateMedicineById: async (id, name, description, price, form) => {
    return await prisma.medicine.update({
      where: { id: Number(id) },
      data: { name, description, pricePerUnit: price, form },
    });
  },
};

export default medicinesService;
