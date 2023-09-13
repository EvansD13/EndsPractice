const pokeForm = document.querySelector("#inputSection form");
const pokeList = document.querySelector("#pokemonTeam ul")
const pokeType = document.querySelector("#pokemonType p")

const createForm = document.querySelector("#create-form")

let type = 0;


pokeForm.addEventListener("submit", extractPokemon)
createForm.addEventListener("submit", createNewPokemon)

async function fetchPokemonData(pokemon){
    try {
        //const respData = await fetch(`api`)
        //const respImg = await fetch(`imagestuff`)
    }
}
