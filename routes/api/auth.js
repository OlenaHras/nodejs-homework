const express = require("express");

const {
  register,
  verify,
  resendVerify,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  authSchema,
  subscriptionSchema,
  userEmailSchema,
} = require("../../schemas/user");

const router = express.Router();

router.post(
  "/register",
  upload.single("avatar"),
  validateBody(authSchema),
  register
);
router.get("/verify/:verificationToken", verify);
router.post("/verify", validateBody(userEmailSchema), resendVerify);
router.post("/login", validateBody(authSchema), login);
router.get("/current", authenticate, getCurrent);
router.patch(
  "/",
  authenticate,
  validateBody(subscriptionSchema),
  updateSubscription
);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);
router.post("/logout", authenticate, logout);
module.exports = router;
