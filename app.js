const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const Handlebars = require("handlebars");

const { PROJECTS } = require("./data/projects");

const app = express();


// Middleware

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


// Static files

app.use(
    express.static(
        path.join(__dirname, "public"),
        { maxAge: process.env.NODE_ENV === "production" ? "7d" : 0 }
    )
);


// The command palette lives in the layout, so every render needs the index.

app.use((req, res, next) => {
    res.locals.allProjects = PROJECTS;
    next();
});


// Handlebars setup

app.engine(
    "hbs",
    engine({
        extname: "hbs",
        defaultLayout: "main",
        layoutsDir: path.join(__dirname, "views/layouts"),
        partialsDir: path.join(__dirname, "views/partials"),
        handlebars: Handlebars,
        helpers: {
            eq: (a, b) => a === b,
            // Ordinal used to number the work index: 01, 02, 03…
            pad: (index) => String(index + 1).padStart(2, "0"),
            join: (list, separator) =>
                Array.isArray(list) ? list.join(typeof separator === "string" ? separator : ", ") : ""
        }
    })
);


app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "views"));


// Routes

const routes = require("./routes/index");

app.use("/", routes);


// Export for Vercel

module.exports = app;
