import express from "express";
const router = express.Router();

// Show all posts
router.get("/", (req, res) => {
  res.render("index", { posts: req.app.locals.posts });
});

// Submit a new post
router.post("/submit", (req, res) => {
  const { title, thoughts } = req.body;
  const newPost = {
    id: req.app.locals.idCounter(),
    title,
    thoughts
  };
  req.app.locals.posts.push(newPost);
  res.redirect("/");
});

// Read a single post
router.get("/post/:id", (req, res) => {
  const post = req.app.locals.posts.find(p => p.id === parseInt(req.params.id));
  res.render("read", { post });
});

// Edit form
router.get("/edit/:id", (req, res) => {
  const post = req.app.locals.posts.find(p => p.id === parseInt(req.params.id));
  res.render("edit", { post });
});

// Handle edit submission
router.post("/edit/:id", (req, res) => {
  const post = req.app.locals.posts.find(p => p.id === parseInt(req.params.id));
  post.title = req.body.title;
  post.thoughts = req.body.thoughts;
  res.redirect("/");
});

// Delete a post
router.post("/delete/:id", (req, res) => {
  req.app.locals.posts = req.app.locals.posts.filter(
    p => p.id !== parseInt(req.params.id)
  );
  res.redirect("/");
});

export default router;
