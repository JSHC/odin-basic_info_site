const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact-me", (req, res) => {
    res.render("contact-me");
});

app.use((req, res, next) => {
    res.status(404);
    res.render("404");
});

app.listen(3000, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
