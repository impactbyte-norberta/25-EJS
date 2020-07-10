const express = require("express");
const app = express();
const ejs = require("ejs");
const PORT = process.env.PORT || 4000;

const todos = require("./data/data");

app.use(express.json()); // body-parser, raw
app.use(express.urlencoded({ extended: false })); // www-form-url-encoded

// Membaca file .ejs
app.set("view engine", "ejs");

// membaca file statis di folder views
app.use(express.static("views"));

app.get("/", (req, res) => {
    res.render("pages/home");
});

// send data to ejs file
app.get("/movies", (req, res) => {
    const movies = [
        {
            title: "Harry Potter",
            year: 2000,
            ratings: 5,
            genres: ["fantasy"],
        },
        {
            title: "Doraemon",
            year: 2008,
            ratings: 5,
            genres: ["scifi", "animation"],
        },
    ];

    res.render("pages/movies", {
        movies,
    });
});

// use params
app.get("/movies/:title", (req, res) => {
    const title = req.params.title;

    res.render("pages/movieDetails", {
        title,
    });
});

// todo route
app.get("/todos", (req, res) => {
    res.send(todos);
});

app.post("/todos", (req, res) => {
    const { name } = req.body;

    todos.push({
        name,
        isDone: false,
    });

    res.send({
        message: "Data berhasil diinput",
        todo: { name, isDone: false },
    });
});

app.listen(PORT, () => {
    console.log(`Servers runs on port ${PORT}`);
});
