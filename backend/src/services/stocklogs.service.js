import prisma from "../config/prisma.js";

const stocksService = {
  getAllStocks: async () => {
    const result = await prisma.pharmacyStockLog.findMany({
      include: {
        medicine: {
          select: { name: true, form: true },
        },
      },
      orderBy: { changeAt: "desc" },
    });
    return result.filter((el) => el.medicine !== null);
  },
  getStocksByMedicineId: async (id) => {
    return await prisma.medicine.findUnique({
      where: { id: Number(id) },
      include: { pharmacyStockLog: true },
    });
  },
  createStock: async (change, reason, medicineId) => {
    return await prisma.pharmacyStockLog.create({
      data: { change, reason, medicineId },
    });
  },
  editMedicineStock: async (old, change, id) => {
    return await prisma.medicine.update({
      where: { id: Number(id) },
      data: { stock: Number(old) + Number(change) },
    });
  },
  updateStockStatus: async () => {
    return await prisma.pharmacyStockLog.update({
      data: { stockLogCreated: true },
    });
  },
};

export default stocksService;
