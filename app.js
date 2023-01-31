const express = require("express");
const config = require("./config/config");
const db = require("./config/db");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const authMiddleware = require("./middlewares/auth");

const app = express();
db.init();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/order", authMiddleware, orderRoutes);
app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
