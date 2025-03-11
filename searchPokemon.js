let searching = false;

function searchPokemon() {
    const filter = getFilterValue();
    const filteredPokemon = filterPokemonData(filter);

    if (filter.length >= 3) {
        startSearch();
        displayFilteredPokemon(filteredPokemon);
    } else {
        resetSearch();
    }
}

function getFilterValue() {
    const searchBar = document.getElementById("searchBar");
    return searchBar.value.toUpperCase();
}

function filterPokemonData(filter) {
    return allPokemonData.filter(pokemon =>
        pokemon.name.toUpperCase().includes(filter)
    );
}

function startSearch() {
    const pokemonListElement = document.getElementById("pokemonList");
    const searchListElement = document.getElementById("searchList");
    searching = true;
    pokemonListElement.classList.add('d-none');
    searchListElement.classList.remove('d-none');
    searchListElement.innerHTML = '';
}

function resetSearch() {
    const pokemonListElement = document.getElementById("pokemonList");
    const searchListElement = document.getElementById("searchList");
    searching = false;
    pokemonListElement.classList.remove('d-none');
    searchListElement.classList.add('d-none');
    document.getElementById('loadMoreBtn').classList.remove('d-none')
}

function displayFilteredPokemon(filteredPokemon) {
    const searchListElement = document.getElementById("searchList");
    filteredPokemon.forEach(pokemonData => {
        const pokemonCard = createPokemonCard(pokemonData);
        searchListElement.appendChild(pokemonCard);
        document.getElementById('loadMoreBtn').classList.add('d-none')
    });
}