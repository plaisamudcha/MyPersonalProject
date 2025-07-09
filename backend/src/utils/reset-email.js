import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetEmail = async (user, token) => {
  const filePath = path.join(__dirname, "..", "templates", "reset.html");
  let html = fs.readFileSync(filePath, "utf-8");
  const resetLink = `http://localhost:5173/reset/${token}`;
  html = html.replace("{{RESET_LINK}}", resetLink);

  await transporter.sendMail({
    from: `Samudcha Project ${process.env.EMAIL_USER}`,
    to: user.email,
    subject: "Reset your password",
    html,
  });
};

export default sendResetEmail;
