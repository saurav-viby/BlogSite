const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose=require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://admin-saurav:vibeServer1234@cluster0.539zo.mongodb.net/blogDb');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.use(express.static("public"))



const composeSchema={
  title:String,
  content:String
};

const Compose=mongoose.model("Compose",composeSchema);



const homeStartingContent = "The era of post-it notes is coming to its end. With an increased focus on technology, apps are increasingly becoming the preferred method for taking notes for thousands of people. Note taking apps like blog help you simplify the complications in everyday life. I mean, no one wants to forget an anniversary or birthday. "
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";





app.get("/",function (req,res) {
  Compose.find({},function (err,posts) {
    res.render("home",{
      sContent: homeStartingContent,
      posts: posts
    });

});

});


app.get("/about", function(req, res) {

  res.render("about", {
    dAbout: aboutContent
  });

})

app.get("/contact", function(req, res) {

  res.render("contact", {
    dContact: contactContent
  });

})

app.get("/compose", function(req, res) {
  res.render("compose");


})





app.post("/compose", function(req, res) {


const post=new Compose({
  title:req.body.titles,
content: req.body.contents
})

  post.save(function (err) {
    if(!err){
        res.redirect("/");
    }

  });



});

app.get("/posts/:postId", function(req, res) {

const requestedPostId = req.params.postId;

Compose.findOne({_id: requestedPostId}, function(err, post){

   res.render("post", {

     title: post.title,

     content: post.content

   });

 });




});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(req, res) {

  console.log("server up");

})
