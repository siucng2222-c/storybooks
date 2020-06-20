const express = require("express");
const router = express.Router();
const passport = require("passport");

// @desc    Auth with Google
// @route   GET /auth/google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @desc    Logout user
// @route   GET /auth/logout
router.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
