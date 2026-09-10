const express = require("express");
const { PROJECTS, TECHNOLOGIES, bySlug, featured, neighbours } = require("../data/projects");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
        page: "home",
        projects: featured(),
        technologies: TECHNOLOGIES
    });
});

router.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        page: "about"
    });
});

router.get("/projects", (req, res) => {
    res.render("projects", {
        title: "Projects",
        page: "projects",
        projects: PROJECTS
    });
});

router.get("/projects/:slug", (req, res, next) => {
    const project = bySlug(req.params.slug);
    if (!project) {
        return next();
    }
    const { prev, next: after } = neighbours(project.slug);
    res.render("project", {
        title: project.name,
        page: "projects",
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

// Short-lived URLs from the redesign, kept so nothing 404s.
router.get("/work", (req, res) => res.redirect(301, "/projects"));
router.get("/work/:slug", (req, res) => res.redirect(301, "/projects/" + req.params.slug));

router.use((req, res) => {
    res.status(404).render("404", {
        title: "Page Not Found",
        page: "missing"
    });
});

module.exports = router;
