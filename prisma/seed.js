const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);    // give user password

  const user = await prisma.user.create({
    data: {
      id: 'user-1',      // give user id
      name: 'testuser1',  // give uer name
      email: 'test1@example.com', // give user email
      password: hashedPassword, 
    },
  });

  console.log('✅ User created:', user);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });



/*
  // this is the type script code from here

  import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
    },
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
});




// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Or 'bcrypt' if you're using that

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("secret123", 10);

  await prisma.user.create({
    data: {
      id: "user-1",
      name: "Test User",
      email: "test@example.com",
      hashedPassword: hashedPassword,
    },
  });

  console.log("✅ Seeded user successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });


  */