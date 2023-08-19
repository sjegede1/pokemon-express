const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 3000;

const Pokemon = require("./models/pokemon");

// =========== MIDDLEWARE ===========
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MONGODB 🍃");
});

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the Pokemon App</h1> <a href='pokemon'>pokemon</a>`);
});

//===== SHOW ROUTE C[R]UD ===============
app.get("/pokemon", async (req, res) => {
  const allPokemon = await Pokemon.find({});
  res.render("Index", { pokemon: allPokemon }); //<Index pokemon={allPokemon} />
});

app.get("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findById(req.params.id);
  res.render("Show", { pokemon });
});

// ======== NEW POKEMON CREATE ROUTE ================
app.post("/pokemon", async (req,res) => {
    const newPokemon = await Pokemon.create(req.body);
    res.json(newPokemon)
})

app.listen(PORT, (req, res) => {
  console.log("Now listening on Port " + PORT, `http://localhost:${PORT}`);
});
