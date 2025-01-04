const express = require('express');
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
uuidv4();


app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));


let posts = [
    {
        id: uuidv4(),
        username : "Abhishek mishra",
        content : "I love coding!",
    },
    {
        id: uuidv4(),
        username : "Harsh Awasthi",
        content : "Hard work is important to achieve success",
    },
    {
        id: uuidv4(),
        username : "Anurag Sharma",
        content : "I got selected for my 1st internship",
    },
    {
        id: uuidv4(),
        username : "Sachin Sharma",
        content : "I love coding in Python",
    },
    {
        id: uuidv4(),
        username : "Ansh Gupta",
        content : "I am good in mathematics",
    },
    {
        id: uuidv4(),
        username : "Ayush Uttam",
        content : "I have participated in college fest in my second year of engineering",
    },
    {
        id: uuidv4(),
        username : "Ayush Thakur",
        content : "I want to become an astronaut so i am doing engineering",
    },
    {
        id: uuidv4(),
        username : "Krishna",
        content : "I have a much knowledge in cybersecurity so i want to join army and work for my country",
    },
];

app.get("/posts", (req,res) => {
    res.render("index.ejs", {posts});
});

//Create post
app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});

//Add post
app.post("/posts", (req,res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

//Read post
app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

//Update post
app.patch("/posts/:id/", (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

//Edit post
app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});


//Delete Post
app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});
app.listen(8080, () => {
    console.log("Listening to port 8080");
})