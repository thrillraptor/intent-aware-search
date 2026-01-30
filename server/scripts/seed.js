import { Seeder } from "mongo-seeding";
import env from "../config/env.js";
import postsData from "../data/posts/data.js";

var uri = env.URI;

const config = {
  database: uri,
  dropCollections: true,
};

const seeder = new Seeder(config);

const date = new Date();

const dataWithTimeStamps = postsData.map((post) => ({
  ...post,
  createdAt: date,
}));

const collections = [
  {
    name: "posts",
    documents: dataWithTimeStamps,
  },
];

(async () => {
  try {
    await seeder.import(collections);
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed: ", error);
    process.exit(1);
  }
})();
