// initialize server
const express = require("express");

const app = express();

const bodyParser = require("body-parser");

// connect static files
app.use(express.static("public"));

//initialize body parrser for collecting user text input
app.use( bodyParser.urlencoded( { extended: true } ) );

//set post data
let posts = []; 

// set the incremental id count
let idCount = 1;

// handle post creation
app.post("/create", ( request, response ) => {
  // collect the post data fields from the user entered text
  const { author, text, title} = request.body;
  //set the new post into the temp array of posts
  posts.push({author,text,title,id: idCount++,date: new Date()});
  //redirect user back to home page
  response.redirect("/");
});

// handle post delete
app.post( "/deletePost/:id", ( request, response ) => {
  // set posts to the version of post with desired post removed
  posts = posts.filter(p => p.id != request.params.id);
  // redirect user back to home page
  response.redirect("/");
});

// handle edit post retrieval function
app.get("/editPost/:id", (request, response ) => {
  // locate the desired post
  const post = posts.find(p => p.id == request.params.id);
  //display edit page with post data
  response.render( "edit.ejs", {post} );
});

// handle post edit post
app.post("/editPost/:id", (request, response) => {
  // collect the post data from the user text
  const { author, title, text } = request.body;
  // search for the desired post to be edited
  const editedPost = posts.find(p => p.id == request.params.id);
  //check for post exists
  if ( editedPost ) 
    {
      //set the post data field
      editedPost.text = text;
      editedPost.author = author;
      editedPost.title = title;
    }

  //redirect user back to home page
  response.redirect("/");
});

//handle initial page direction
app.get("/", ( request, response ) => {
  // display index
  response.render("index.ejs", { posts });
  
});

//start server listening
app.listen(3000, () => console.log("Server @: http://localhost:3000"));
