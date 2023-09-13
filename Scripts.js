const pokeForm = document.querySelector("#inputSection form");
const pokeList = document.querySelector("#pokemonTeam ul")
const pokeType = document.querySelector("#pokemonType p")

const createForm = document.querySelector("#create-form")

//let type = 0;


pokeForm.addEventListener("submit", extractPokemon)
createForm.addEventListener("submit", createNewPokemon)

async function fetchPokemonData(pokemon){
    try {
        const repsData = await fetch(`https://mini-pokemon-api-pvwq.onrender.com/pokemon/${pokemon}`)
        const repsImg = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/{pokemon.id}.png`)
    if (repsData.ok && repsImg.ok){
        const data = await repsData.json();
        const imgData = await repsImg.json();
        addPokemon(data, ImgData)
    }else{
        throw "Something has gone wrong with one of the API requests";
    }

    }catch{e}{
        console.log(e);
    }
}

function extractPokemon(e){
    e.preventDefault();
    fetchPokemonData(e.target.pokemonInput.value);
    e.target.pokemonInput.value = "";
}


function addPokemon(pokemon, pokemonImg){
    const img = document.createElement("img");
    img.classList.add("pokemon");
    img.alt = pokemon.name.english;
    img.src = pokemonImg.hits[0].previewURL;

    img.addEventListener("click", removePokemon, {once: true});
    pokeList.appendChild(img);

    const li = document.createElement("li")
    li.textContent = pokemon.name.english;
    li.addEventListener("click", removePokemon);

    pokeList.appendChild(li)
}

function removePokemon(e) {
    const pokeName = e.target.alt;

    e.target.remove();
}

async function createNewPokemon(e){
    e.preventDefault();

    const data = {name: e.target.pokemonInput.value}

    const options = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch("https://mini-pokemon-api-pvwq.onrender.com", options)
    console.log(response)
    let message = document.querySelector("#message")
    if(response.status == 201){
        //Display a successful message to the user
        e.target.pokemonInputInput.value = ""
        message.textContent = "Pokemon successfully created!"
    }else{
        //Display an error message
        e.target.pokemonInput.value = ""
        message.textContent = "Pokemon already exists; please enter another!"
    }

}
