const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.post("/", orderController.create);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);

module.exports = router;