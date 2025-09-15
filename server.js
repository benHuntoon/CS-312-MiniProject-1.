// initialize server
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// connect static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//set post data
let posts = []; 
let idCounter = 1;

//handle initial page direction
app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

// handle post creation
app.post("/create", (req, res) => {
  const { author, title, content } = req.body;
  posts.push({
    id: idCounter++,
    author,
    title,
    content,
    date: new Date()
  });
  //redirect user back to home page
  res.redirect("/");
});

// handle post delete
app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  // redirect user back to home page
  res.redirect("/");
});

// handle edit post retrieval function
app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  //display edit page with post data
  res.render("edit.ejs", { post });
});

// handle post edit post
app.post("/edit/:id", (req, res) => {
  const { author, title, content } = req.body;
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.author = author;
    post.title = title;
    post.content = content;
  }
  //redirect user back to home page
  res.redirect("/");
});

//start server listening
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
