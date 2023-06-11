const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/auth");
const { validateBody, authenticate } = require("../../middlewares");
const { authSchema, subscriptionSchema } = require("../../schemas/user");

const router = express.Router();

router.post("/register", validateBody(authSchema), register);
router.post("/login", validateBody(authSchema), login);
router.get("/current", authenticate, getCurrent);
router.patch(
  "/",
  authenticate,
  validateBody(subscriptionSchema),
  updateSubscription
);
router.post("/logout", authenticate, logout);
module.exports = router;
