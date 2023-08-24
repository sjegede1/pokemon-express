const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
var methodOverride = require("method-override");

const PORT = 3000;

const Pokemon = require("./models/pokemon");

// =========== MIDDLEWARE ===========
// app.set('views','/views');
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
  try {
    res.render("Create");
  } catch (error) {
    res.status(500).send('Create Page no open 😢',error);
  }
});

app.post("/create", async (req, res) => {

  try {
    const pokemonName = await req.body.name.toLowerCase();
    const newPokemon = await Pokemon.create({
      name: pokemonName,
      img: `http://img.pokemondb.net/artwork/${pokemonName}`,
    });
    res.redirect("/pokemon");
  } catch (error) {
    res.status(500).send(error)
  }
});

//===== SHOW ROUTE C[R]UD ===============
app.get("/pokemon", async (req, res) => {
  try {
    const allPokemon = await Pokemon.find({});
    res.render("Index", { pokemon: allPokemon }); //<Index pokemon={allPokemon} />
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/pokemon/:id", async (req, res) => {

  try {
    const pokemon = await Pokemon.findById(req.params.id);
    res.render("Show", { pokemon });
  } catch (error) {
    res.status(500).send(error);
  }
});

// ===========EDIT POKEMON CR[U]D
app.put("/replace/:id", async (req, res) => {

  try {
    const newPokemon = {
      name: req.body.name.toLowerCase(),
      img: `http://img.pokemondb.net/artwork/${req.body.name}`
    };
    await Pokemon.findOneAndReplace({_id: req.params.id}, newPokemon);
    res.redirect('/pokemon')
  } catch (error) {
    res.status(500).send(error);
  }
});

// ===========DELETE POKEMON CRU[D] ==========
app.delete("/delete/:id", async (req,res) => {

  try {
    await Pokemon.findOneAndDelete({_id: req.params.id})
    res.redirect('/pokemon')
  } catch (error) {
    res.status(500).send(error);
  }
})


// ==========LISTENING ===============
app.listen(PORT, () => {
  console.log("Now listening on Port " + PORT, `http://localhost:${PORT}`);
});
