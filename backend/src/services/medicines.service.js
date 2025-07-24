import prisma from "../config/prisma.js";

const medicinesService = {
  getAllMedicines: async (page, limit, name = "", form = "") => {
    const validForms = ["TABLET", "CAPSULE", "SYRUP", "INJECTION", "CREAM"];
    const [total, medicines] = await Promise.all([
      prisma.medicine.count({
        where: {
          AND: [
            { name: { contains: name } },
            ...(validForms.includes(form) ? [{ form: { equals: form } }] : []),
          ],
        },
      }),
      prisma.medicine.findMany({
        where: {
          AND: [
            { name: { contains: name } },
            ...(validForms.includes(form) ? [{ form: { equals: form } }] : []),
          ],
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);
    return { total, medicines };
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
  findExistmedicine: async (name, form) => {
    const validForms = ["TABLET", "CAPSULE", "SYRUP", "INJECTION", "CREAM"];
    return await prisma.medicine.findFirst({
      where: {
        AND: [
          { name: { contains: name } },
          ...(validForms.includes(form) ? [{ form: { equals: form } }] : []),
        ],
      },
    });
  },
};

export default medicinesService;
