const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

router.get("/register", controller.register);

router.post("/register", controller.create_user);

router.get("/login", controller.login);

router.post("/login", controller.loginUser);

router.get("/change-password", controller.changePassword);

router.post("/change-password", controller.changePasswordSave);

router.get("/logout", controller.logout)

module.exports = router;

