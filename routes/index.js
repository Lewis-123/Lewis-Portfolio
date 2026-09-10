const express = require("express");

const router = express.Router();


// Home Page

router.get("/", (req, res)=>{

    res.render("index", {

        title:"Home"

    });

});




// About Page

router.get("/about",(req,res)=>{

    res.render("about",{

        title:"About Me"

    });

});




// Projects Page

router.get("/projects",(req,res)=>{

    res.render("projects",{

        title:"Projects"

    });

});




// Contact Page

router.get("/contact",(req,res)=>{

    res.render("contact",{

        title:"Contact"

    });

});





// 404 Page

router.use((req,res)=>{

    res.status(404).render("404",{

        title:"Page Not Found"

    });

});




module.exports = router;