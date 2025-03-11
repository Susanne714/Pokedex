let allPokemonData = [];
const BASE_URL = "https://pokeapi.co/api/v2/";

document.addEventListener("DOMContentLoaded", () => {
    fetchAllPokemon();
});

async function fetchAllPokemon() {
    try {
        showSpinner();
        const response = await fetch(`${BASE_URL}pokemon?limit=156`);
        const data = await response.json();
        await Promise.all(data.results.map(pokemon => fetchPokemonDetails(pokemon.url)));
        allPokemonData.sort((a, b) => a.id - b.id); // Sortiere die Pokemon nach ID
        displayPokemon();
    } catch (error) {
        console.error("Error fetching Pokemon data:", error);
    } finally {
        hideSpinner();
    }
}

async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        allPokemonData.push(data);
    } catch (error) {
        console.error("Error fetching Pokemon details:", error);
    }
}

function showSpinner() {
    document.getElementById("spinner").style.display = "block";
}

function hideSpinner() {
    document.getElementById("spinner").style.display = "none";
}