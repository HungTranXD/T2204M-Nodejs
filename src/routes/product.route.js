const express = require("express");
const router = express.Router();
const controller = require("./../controllers/product.controller")


router.get("/", controller.get);

router.get("/create", controller.create);

router.post("/create", controller.save);

module.exports = router;
