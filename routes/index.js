const express = require("express");
const { PROJECTS, bySlug, featured, neighbours } = require("../data/projects");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "Software Developer",
        page: "home",
        projects: featured()
    });
});

router.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        page: "about"
    });
});

router.get("/work", (req, res) => {
    res.render("work", {
        title: "Work",
        page: "work",
        projects: PROJECTS
    });
});

// Old URL, kept so existing links and bookmarks don't break.
router.get("/projects", (req, res) => {
    res.redirect(301, "/work");
});

router.get("/work/:slug", (req, res, next) => {
    const project = bySlug(req.params.slug);
    if (!project) {
        return next();
    }
    const { prev, next: after } = neighbours(project.slug);
    res.render("case", {
        title: project.name,
        page: "work",
        project,
        prev,
        next: after
    });
});

router.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact",
        page: "contact"
    });
});

router.use((req, res) => {
    res.status(404).render("404", {
        title: "Page not found",
        page: "missing"
    });
});

module.exports = router;
