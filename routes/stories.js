const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Story = require("../models/Story");

// @desc    Show add page
// @route   GET /stories/add
router.get("/stories/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get("/stories/edit/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOne({ _id: req.params.id }).lean();
    if (!story) {
      return res.render("error/404");
    }

    // Verify story belongs to logged in user
    if (story.user != req.user.id) {
      // If no, redirect user to public stories page
      res.redirect("/stories");
    } else {
      // If yes, rendor edit story page with story object
      res.render("stories/edit", { story });
    }
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
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

// @desc    Show single story
// @route   GET /stories/:id
router.get("/stories/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findById({ _id: req.params.id })
      .populate("user")
      .lean();

    if (!story) {
      return res.render("error/404");
    }

    // pass the story object to hbs template
    res.render("stories/show", {
      story,
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

// @desc    Process edit form
// @route   PUT /stories/:id
router.put("/stories/:id", ensureAuth, async (req, res) => {
  try {
    // app.js add urlencoded and json middlewares
    // to convert request body into JSON
    // and here add the logged in user's id into JSON body's "user" attribute

    let story = await Story.findById(req.params.id).lean();
    if (!story) {
      return res.render("error/404");
    }

    // Verify story belongs to logged in user
    if (story.user != req.user.id) {
      // If no, redirect user to public stories page
      res.redirect("/stories");
    } else {
      // If yes, update story to mongoDB
      story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

// @desc    Delete Story
// @route   DELETE /stories/:id
router.delete("/stories/:id", ensureAuth, async (req, res) => {
  try {
    // app.js add urlencoded and json middlewares
    // to convert request body into JSON
    // and here add the logged in user's id into JSON body's "user" attribute

    let story = await Story.findById(req.params.id).lean();
    if (!story) {
      return res.render("error/404");
    }

    // Verify story belongs to logged in user
    if (story.user != req.user.id) {
      // If no, redirect user to public stories page
      res.redirect("/stories");
    } else {
      // If yes, delete story from mongoDB
      story = await Story.findOneAndDelete({ _id: req.params.id });
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

module.exports = router;
