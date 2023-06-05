const express = require("express");
const router = express.Router();
const controller = require("./../controllers/product.controller")


router.get("/", controller.get);

router.get("/create", controller.create);

router.post("/create", controller.save);

router.get("/delete/:id", controller.delete);

router.get("/cart", controller.cart);

router.post("/add-to-cart", controller.addToCart);

router.get("/clear-cart", controller.clearCart);

router.get("/checkout", controller.checkout)

module.exports = router;
