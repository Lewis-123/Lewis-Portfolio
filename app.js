const express = require("express");
const path = require("path");

const app = express();


// Middleware

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


// Static files

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);



// Handlebars setup

const { engine } = require("express-handlebars");


app.engine(
    "hbs",
    engine({

        extname: "hbs",

        defaultLayout: "main",

        layoutsDir: path.join(
            __dirname,
            "views/layouts"
        )

    })
);



app.set(
    "view engine",
    "hbs"
);



app.set(
    "views",
    path.join(
        __dirname,
        "views"
    )
);




// Routes

const routes = require("./routes/index");

app.use("/", routes);




// Export for Vercel

module.exports = app;