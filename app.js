const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();

const PORT = process.env.PORT || 3000;


// Handlebars setup
app.engine(
    "hbs",
    engine({
        extname: "hbs",
        defaultLayout: "main"
    })
);

app.set("view engine", "hbs");


// Static files
app.use(express.static(path.join(__dirname, "public")));


// Routes
const routes = require("./routes/index");

app.use("/", routes);


// Server
app.listen(PORT, () => {
    console.log(`Portfolio running on port ${PORT}`);
});