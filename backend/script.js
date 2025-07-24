import prisma from "./prisma/client.js";
import bcrypt from "bcryptjs";
// await bcrypt.hash("<password>", 10)
async function main() {
  const script = await prisma.user.findMany();
  console.log(script);
}

main();
