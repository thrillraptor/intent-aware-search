import express from "express";
import { corsOptions } from "./config/cors.config.js";
import cors from "cors";
import connectDatabase from "./config/db.config.js";
import env from "./config/env.config.js";

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.get("/api/check", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "All systems green.",
  });
});

import postRoutes from "./routes/post.router.js";
import searchRoutes from "./routes/search.route.js";

app.use("/api", postRoutes);
app.use("/api", searchRoutes);

var PORT = env.PORT;
var uri = env.URI;

(async () => {
  try {
    await connectDatabase(uri);
    app.listen(PORT, () => {
      console.log(`Server running on PORT → ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
})();
