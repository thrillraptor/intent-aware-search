import * as dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  URI: process.env.MONGO_URI,
};
