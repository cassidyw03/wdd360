const pokemonList = document.querySelector("#pokemon-list");
const aboutPokemon = document.querySelector("#about-pokemon");
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=40";

function pokemonListItem(pokemon) {
    return `<li><button data-url="${pokemon.url}">${pokemon.name}</button></li>`;
}

function aboutPokemonItem(pokemon) {
    return `
    <h2>${pokemon.name}</h2>
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    `;
}

function renderPokemonList(pokemon) { 
    const pokemonListHtml = pokemon.map(pokemonListItem).join("");
    pokemonList.innerHTML = pokemonListHtml;
}
// different

async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function pokeListHandler(event) {
    const pokemonUrl = event.target.dataset.url;
    const list = await getData(pokemonUrl);
    const detailsHtml = aboutPokemonItem(list);
    aboutPokemon.innerHTML = '';
    aboutPokemon.insertAdjacentElement('afterbegin', detailsHtml);
}

async function init() {
    const data = await getData(apiUrl);
    const pokemon = data.results.sort((a, b) => a.name > b.name ? 1 : -1);
    renderPokemonList(pokemon); 
}
pokemonList.addEventListener("click", pokeListHandler);
init();
