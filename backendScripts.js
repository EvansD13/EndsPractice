require("dotenv").config()
const cors = require("cors")
const express = require("express")

const pokemon = require("./pokedex.json")

const fs = require("fs")


const app = express()
const port = process.env.PORT

app.use(cors())

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to the wonderful world of Pokemon!")
})

app.get("/pokemon", (req, res) => {
    res.send(pokemon)
})

app.get("/pokemon/:name", (req, res) => {
    let pre_id = req.params.name[0].toUpperCase() + req.params.name.slice(1).toLowerCase()
    
    const pokaymon = pokemon.find(pokaymon => pokaymon.name.english === pre_id)
    if (pokaymon == undefined){
        res.status(404).send("This Pokemon doesn't exist!")
        console.log("This Pokemon doesn't exist")
    }else{
        console.log(pokaymon)
        res.status(213).send(pokaymon)
    }
})

app.post("/pokemon", (req, res) =>{
    const check = req.body.name
    console.log(check)
    const found = pokemon.find(found => found.name.english.toLowerCase() === check.english.toLowerCase())

    const ids = pokemon.map(poke => poke.id)
    let maxID = Math.max(...ids)

    if (found != undefined){
        res.status(400).send("This Pokemon already exists!")
        console.log("This Pokemon already exists!")

    }else{
        pokeBody = check.english[0].toUpperCase() + check.english.slice(1).toLowerCase() 

        req.body.id = maxID + 1
        req.body.name.english = pokeBody

        pokemon.push(req.body)

        fs.writeFile("pokedex.json", JSON.stringify(pokemon), function(err){
            if (err) throw err;
            console.log("complete")
        })
        console.log("Added!")
        res.status(201).send("Added")
        
    }
    console.log(req.body)

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })