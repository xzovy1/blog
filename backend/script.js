import prisma from "./prisma/client.js";
import bcrypt from "bcryptjs";
// await bcrypt.hash("<password>", 10)

const dummyPosts = [
  {
    title: "Blog Post 1",
    body: "This is a body for dummy blog content 1",
    published_status: true,
  },
  {
    title: "Blog Post 2",
    body: "This is a body for dummy blog content 2",
  },
  {
    title: "Blog Post 2",
    body: "This is a body for dummy blog content 2",
  },
];

async function main() {
  const script = await prisma.author.create({
    data: {
      name: "admin",
      password: await bcrypt.hash("admin", 10),
    },
  });
  console.log(script);
}

main();
