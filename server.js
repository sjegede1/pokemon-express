const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 3000;

// const pokemon = require('./models/pokemon');
const Pokemon = require("./models/pokemon");

// ===========MIDDLEWARE===========
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the Pokemon App</h1> <a href='pokemon'>pokemon</a>`);
});

app.get("/pokemon", (req, res) => {
    const allPokemon = Pokemon.find({}) 
    res.render("Index",{pokemon: allPokemon});//<Index pokemon={allPokemon} />
});



app.get("/pokemon/:id", (req, res) => {
  res.render("Show", { index: req.params.id });
});

app.listen(PORT, (req, res) => {
  console.log("Now listening on Port " + PORT);
});
