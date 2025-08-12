import prisma from "./client.js";
import bcrypt from "bcryptjs";

async function main() {
  const existingAdmin = await prisma.author.findUnique({
    where: { name: "author" },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || "admin",
      10
    );
    const admin = await prisma.author.create({
      data: {
        name: "author",
        password: hashedPassword,
      },
    });
    console.log("admin user created", admin.name);
  } else {
    console.log("admin already exists");
  }
}

main()
  .catch((e) => {
    console.error("seed error", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
