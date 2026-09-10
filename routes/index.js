const express = require("express");

const router = express.Router();


// Home
router.get("/", (req, res)=>{
    res.render("index", {
        title:"Home"
    });
});


// About
router.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Me"
    });
});


// Projects
router.get("/projects",(req,res)=>{
    res.render("projects",{
        title:"Projects"
    });
});


// Contact
router.get("/contact",(req,res)=>{
    res.render("contact",{
        title:"Contact"
    });
});


module.exports = router;