interface PokemonSimple {
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
}

const pokemonList = document.querySelector<HTMLUListElement>("#pokemon-list");
const pokemonDetails = document.querySelector<HTMLDivElement>("#pokemon-details");
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=40";

function pokemonListTemplate(item: PokemonSimple) {
  return `<li><button data-url="${item.url}">${item.name}</button></li>`;
}

function pokemonDetailsTemplate(item: PokemonDetails) {
  return `
    <h2>${item.name}</h2>
    <p>Height: ${item.height}</p>
    <p>Weight: ${item.weight}</p>
    <img src="${item.sprites.front_default}" alt="${item.name}">
  `;
}

function renderPokemonList(pokemon: PokemonSimple[]) {
  const pokemonListHtml = pokemon.map(pokemonListTemplate).join("");
  if (pokemonList) {
    pokemonList.insertAdjacentHTML("afterbegin", pokemonListHtml);
  }
}

async function getData(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function pokeListHandler(event: Event): Promise<void> {
  const target = event.target as HTMLElement;
  const pokemonUrl = target.dataset.url;

  if (!pokemonUrl) {
    console.error("No URL found on the target element.");
    return;
  }

  try {
    const list = await getData(pokemonUrl);
    const detailsHtml = pokemonDetailsTemplate(list);
    if (pokemonDetails) {
      pokemonDetails.innerHTML = "";
      pokemonDetails.insertAdjacentHTML("afterbegin", detailsHtml);
    } else {
      throw new Error("Output element not found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function init() {
  const data = await getData(apiUrl);
  if (!data) {
    console.error("No data returned from the API.");
    return;
  }
  renderPokemonList(data.results);
}

pokemonList?.addEventListener("click", pokeListHandler);
init();