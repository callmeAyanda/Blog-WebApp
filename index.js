import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.use(express.static("public"));

// In-memory data store
let posts = [];
let idCounter = 1;

app.get("/", (req, res) => {
    res.render("index", { posts });
});

app.post("/submit", (req, res) => {
    const { title, thoughts } = req.body;
    posts.push({ id: idCounter++, title, thoughts });
    res.redirect("/");
});

app.get("/post/:id", (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        res.render("read", { post });
    } else {
        res.send("Post not found");
    }
});

app.get("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    res.render("edit", { post });
});

app.post("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    post.title = req.body.title;
    post.thoughts = req.body.thoughts;
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
