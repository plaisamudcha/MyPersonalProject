import prisma from "../src/config/prisma.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { Timeschedule } from "../src/generated/prisma/index.js";

async function main() {
  // สร้าง Admin 1 คน
  await prisma.user.create({
    data: {
      firstName: "Samudcha",
      lastName: "Daengtubtim",
      email: "plai@gmail.com",
      password: bcrypt.hashSync("paiishandsome", 12),
      role: "ADMIN",
    },
  });

  // สร้างคนไข้
  for (let i = 0; i < 30; i++) {
    await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync("123456", 12),
        role: "PATIENT",
        patient: {
          create: {
            dob: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
            gender: faker.helpers.arrayElement(["FEMALE", "MALE"]),
            phone: faker.phone.number("08########"),
            profileImage: faker.image.avatar(),
          },
        },
      },
    });
  }

  // สร้างหมอ
  for (let i = 0; i < 8; i++) {
    await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync("654321", 12),
        role: "DOCTOR",
        doctor: {
          create: {
            specialization: faker.helpers.arrayElement([
              "ANESTHESIOLOGY",
              "GENERAL_PRACTICE",
              "INTERNAL_MEDICINE",
              "PEDIATRICS",
              "OBSTETRICS_GYNECOLOGY",
              "SURGERY",
              "ORTHOPEDIC",
              "CARDIOLOGY",
              "NEUROLOGY",
              "DERMATOLOGY",
              "OPHTHALMOLOGY",
              "PSYCHIATRY",
              "ENT",
              "EMERGENCY_MEDICINE",
              "RADIOLOGY",
              "ONCOLOGY",
              "UROLOGY",
            ]),
            profileImage: faker.image.avatar(),
          },
        },
      },
    });
  }

  // สร้างยา 30 รายการ
  await prisma.medicine.createMany({
    data: Array.from({ length: 30 }).map(() => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      stock: faker.number.int({ min: 100, max: 500 }),
      pricePerUnit: parseFloat(faker.commerce.price({ min: 5, max: 50 })),
      form: faker.helpers.arrayElement([
        "CAPSULE",
        "TABLET",
        "SYRUP",
        "INJECTION",
        "CREAM",
      ]),
    })),
  });

  // สร้างระบบนัดหมาย 100 รายการ
  for (let i = 0; i < 100; i++) {
    await prisma.appointment.create({
      data: {
        patientId: faker.number.int({ min: 1, max: 30 }),
        doctorId: faker.number.int({ min: 1, max: 8 }),
        status: faker.helpers.arrayElement(["COMPLETED"]),
        date: faker.date.between({ from: "2025-03-28", to: "2025-07-07" }),
        time: "08:00",
        medicalRecord: {
          create: {
            diagnosis: faker.commerce.productDescription(),
            notes: faker.lorem.sentence(),
            prescription: {
              create: Array.from({ length: 3 }).map(() => ({
                dosage: `${faker.number.int({ min: 1, max: 3 })} tixmes/day`,
                duration: `${faker.number.int({ min: 3, max: 15 })} days`,
                medicineId: faker.number.int({ min: 1, max: 30 }),
              })),
            },
          },
        },
      },
    });
  }

  // สร้าง stock log 50 รายการ
  // for (let i = 0; i < 49; i++) {
  //   await prisma.pharmacyStockLog.create({
  //     data: {
  //       medicineId: faker.number.int({ min: 1, max: 30 }),
  //       change: faker.helpers.arrayElement([10, 20, -5, -10, -15]),
  //       reason: faker.lorem.words({ min: 3, max: 7 }),
  //     },
  //   });
  // }
}
main()
  .then(() => console.log("Seed completed"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
