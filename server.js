const express = require('express')
const app = express()

const PORT = 3000;

const pokemon = require('./models/pokemon')

app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());


app.get('/', (req,res) => {
    res.send(`<h1>Welcome to the Pokemon App</h1> <a href='pokemon'>pokemon</a>`)
})

app.get('/pokemon', (req,res) => {
   res.render('Index')
})

app.get('/pokemon/:id', (req,res) => {
    res.render('Show',{index: req.params.id})
})

app.listen(PORT, (req,res) => {
    console.log('Now listening on Port '+PORT)
})