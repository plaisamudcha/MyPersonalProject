import prisma from "../src/config/prisma.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

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

  // สร้างคนไข้ 20 คน
<<<<<<< HEAD
  for (let i = 0; i < 20; i++) {
=======
  for (let i = 0; i < 25; i++) {
>>>>>>> c55d519 (second commit)
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
<<<<<<< HEAD
=======
            profileImage: faker.image.avatar(),
>>>>>>> c55d519 (second commit)
          },
        },
      },
    });
  }

  // 👨‍⚕️ สร้างหมอ
<<<<<<< HEAD
  for (let i = 0; i < 5; i++) {
=======
  for (let i = 0; i < 8; i++) {
>>>>>>> c55d519 (second commit)
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
<<<<<<< HEAD
=======
            profileImage: faker.image.avatar(),
>>>>>>> c55d519 (second commit)
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

  function getOfficeTime() {
    const hour = Math.floor(Math.random() * 10) + 8; // 08:00 - 17:00
    const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  }
  // สร้างระบบนัดหมาย 30 รายการ
  for (let i = 0; i < 30; i++) {
    await prisma.appointment.create({
      data: {
        patientId: faker.number.int({ min: 1, max: 20 }),
        doctorId: faker.number.int({ min: 1, max: 5 }),
        status: faker.helpers.arrayElement(["SCHEDULED", "COMPLETED"]),
        date: faker.date.between({ from: "2025-06-28", to: "2026-06-28" }),
        time: getOfficeTime(),
        medicalRecord: {
          create: {
            diagnosis: faker.commerce.productDescription(),
            notes: faker.lorem.sentence(),
            prescription: {
              create: {
                dosage: `${faker.number.int({ min: 1, max: 3 })} times/day`,
                duration: `${faker.number.int({ min: 3, max: 7 })} days`,
                medicineId: faker.number.int({ min: 1, max: 30 }),
              },
            },
          },
        },
      },
    });
  }

  // สร้าง stock log 50 รายการ
  for (let i = 0; i < 50; i++) {
    await prisma.pharmacyStockLog.create({
      data: {
        medicineId: faker.number.int({ min: 1, max: 30 }),
        change: faker.helpers.arrayElement([10, 20, -5, -10, -15]),
        reason: faker.lorem.words({ min: 3, max: 7 }),
      },
    });
  }
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
