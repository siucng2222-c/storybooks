const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Story = require("../models/Story");

// @desc    Show add page
// @route   GET /stories/add
router.get("/stories/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});

// @desc    Show all stories
// @route   GET /stories
router.get("/stories", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    // pass the list of stories to hbs template
    res.render("stories/index", {
      stories,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

// @desc    Process add form
// @route   POST /stories
router.post("/stories", ensureAuth, async (req, res) => {
  try {
    // app.js add urlencoded and json middlewares
    // to convert request body into JSON
    // and here add the logged in user's id into JSON body's "user" attribute
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

module.exports = router;
