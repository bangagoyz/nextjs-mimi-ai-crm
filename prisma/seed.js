const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@crm.com" },
    update: {},
    create: {
      email: "admin@crm.com",
      password: password,
    },
  });

  console.log("Admin user created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// const names = [
//   "Andi",
//   "Sari",
//   "Budi",
//   "Rina",
//   "Kevin",
//   "Lisa",
//   "Tono",
//   "Maya",
//   "Dewi",
//   "Arif",
//   "Nina",
//   "Rudi",
//   "Clara",
//   "Bagas",
//   "Dina",
//   "Putra",
//   "Vina",
//   "Rizky",
//   "Hana",
//   "Eka",
//   "Sinta",
//   "Yusuf",
//   "Lina",
//   "Raka",
//   "Fajar",
//   "Nadia",
//   "Gilang",
//   "Tiara",
//   "Doni",
//   "Cindy",
// ];

// const favorites = [
//   "Caramel Latte",
//   "Oat Milk Cappuccino",
//   "Americano",
//   "Vanilla Latte",
//   "Croissant",
//   "Almond Croissant",
//   "Cold Brew",
//   "Matcha Latte",
//   "Hazelnut Latte",
//   "Flat White",
// ];

// function randomItem(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// function maybe(prob) {
//   return Math.random() < prob;
// }

// function generateInterests() {
//   const interests = [];

//   if (maybe(0.4)) interests.push("sweet drinks");
//   if (maybe(0.3)) interests.push("caramel");
//   if (maybe(0.25)) interests.push("pastry lover");
//   if (maybe(0.2)) interests.push("oat milk");
//   if (maybe(0.18)) interests.push("cold brew");
//   if (maybe(0.15)) interests.push("healthy drinks");
//   if (maybe(0.2)) interests.push("morning buyer");
//   if (maybe(0.1)) interests.push("coffee enthusiast");
//   if (maybe(0.05)) interests.push("workshop");

//   if (interests.length === 0) interests.push("coffee enthusiast");

//   return interests;
// }

// async function main() {
//   await prisma.customer.deleteMany();

//   const customers = [];

//   for (let i = 0; i < 250; i++) {
//     customers.push({
//       name: randomItem(names) + " " + (i + 1),
//       favorite: randomItem(favorites),
//       interests: generateInterests(),
//     });
//   }

//   await prisma.customer.createMany({
//     data: customers,
//   });

//   console.log("🌱 Seeded 250 customers with biased distribution");
// }

// main()
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());
