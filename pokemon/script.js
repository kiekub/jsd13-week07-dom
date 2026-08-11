const pokedex = document.getElementById("pokedex");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const randomBtn = document.getElementById("random-btn");
const resetBtn = document.getElementById("reset-btn");
const randomClick = document.getElementById("pokedex")

const defaultPokemon = [1];

// Get Pokémon
async function getPokemon(id) {

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );

  const data = await response.json();

  return data;
}

// Create Pokémon Card
function createPokemonCard(pokemon) {
  return `
    <div class="card">

      <div class="card-image">

        <img
          src="${pokemon.sprites.other["official-artwork"].front_default}"
          alt="${pokemon.name}"
        >

      </div>

      <div class="card-info">

        <p class="pokemon-id">
          #${String(pokemon.id).padStart(4, "0")}
        </p>

        <h2>
          ${pokemon.name}
        </h2>

      </div>

    </div>
  `;
}

// Show Pokémon
async function showPokemon(id) {

  pokedex.innerHTML = "<p>Loading...</p>";

  try {

    const pokemon = await getPokemon(id);

    pokedex.innerHTML = createPokemonCard(pokemon);

  } catch (error) {

    pokedex.innerHTML = `
      <div class="error">
        Something went wrong 😢
      </div>
    `;

  }
}

// Search
searchBtn.addEventListener("click", async () => {
  const searchValue = searchInput.value
    .toLowerCase()
    .trim();
  if (searchValue === "") {
    return;
  }

  try {
    const pokemon = await getPokemon(searchValue);
    pokedex.innerHTML = createPokemonCard(pokemon);
  } catch (error) {
    pokedex.innerHTML = `
      <div class="error">
        Pokémon "${searchValue}" not found 😢
      </div>
    `;

  }

});

// Search with Enter
searchInput.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {
    searchBtn.click();

  }

});

// Random
randomBtn.addEventListener("click", () => {

  const randomId =
    Math.floor(Math.random() * 151) + 1;

  showPokemon(randomId);

});

randomClick.addEventListener("click",() => {

  const randomId =
  Math.floor(Math.random() * 151) + 1;

  showPokemon(randomId);
})

// Reset
resetBtn.addEventListener("click", () => {

  searchInput.value = "";

  showPokemon(1);

});


// Start
showPokemon(1);