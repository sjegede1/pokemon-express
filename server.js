const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
var methodOverride = require("method-override");

const PORT = 3000;

const Pokemon = require("./models/pokemon");

// =========== MIDDLEWARE ===========
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(express.json({ extended: false }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MONGODB 🍃");
});

app.get("/", (req, res) => {
  res.send(
    `<h1>Welcome to the Pokemon App</h1> <a href='pokemon'>pokemon</a> <br/> <a href='create'>create new pokemon</a>`
  );
});

// ====== CREATE NEW POKEMON ======
app.get("/create", async (req, res) => {
  res.render("Create");
});

app.post("/create", async (req, res) => {
  const pokemonName = req.body.name;
  const newPokemon = await Pokemon.create({
    name: pokemonName,
    img: `http://img.pokemondb.net/artwork/${pokemonName}`,
  });
  res.redirect("/pokemon");
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

// ===========EDIT POKEMON CR[U]D
app.put("/replace/:id", async (req, res) => {
  const newPokemon = {
    name: req.body.name,
    img: `http://img.pokemondb.net/artwork/${req.body.name}`
  };
  console.log(req.body)
  await Pokemon.findOneAndReplace({_id: req.params.id}, newPokemon);
  res.redirect('/pokemon')
});

// ===========DELETE POKEMON CRU[D] ==========
app.delete("/delete/:id", async (req,res) => {
  console.log(req.body)
  await Pokemon.findOneAndDelete({_id: req.params.id})
  res.redirect('/pokemon')
})


// ==========LISTENING ===============
app.listen(PORT, () => {
  console.log("Now listening on Port " + PORT, `http://localhost:${PORT}`);
});
