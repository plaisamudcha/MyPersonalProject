FROM node:18-alpine

# Prisma จำเป็นต้องใช้ openssl
RUN apk add --no-cache openssl

WORKDIR /app

# คัดลอกเฉพาะ dependency ก่อน เพื่อใช้ cache
COPY package*.json ./
RUN npm install

# คัดลอก source code ทั้งหมด
COPY . .

# ✅ generate Prisma Client ที่ถูกต้องสำหรับ Alpine
RUN npx prisma generate

# เปิดพอร์ตที่ใช้ใน Express
EXPOSE 3026

CMD ["npm", "run", "dev"]
