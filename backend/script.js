import prisma from "./prisma/client.js";
async function main() {
  const script = await prisma.user.findMany();
  console.log(script);
}

main();
