const express = require("express");
const app = express();
const ejs = require("ejs");

const PORT = process.env.PORT || 4000;

// Membaca file .ejs
app.set("view engine", "ejs");

// membaca file statis di folder views
app.use(express.static("views"));

app.get("/", (req, res) => {
    res.send("Selamat datang di EJS demo");
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

app.listen(PORT, () => {
    console.log(`Servers runs on port ${PORT}`);
});
