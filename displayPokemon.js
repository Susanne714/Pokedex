let currentPage = {};
let currentCardIndex = 0;
let displayedPokemonCount = 0;
const POKEMON_PER_LOAD = 12;
const LOAD_MORE_INCREMENT = 24;

function getPokemonImageUrl(pokemonId) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`;
}

function displayPokemon() {
    const pokemonListElement = document.getElementById("pokemonList");
    const end = Math.min(displayedPokemonCount + POKEMON_PER_LOAD, allPokemonData.length);
    for (let i = displayedPokemonCount; i < end; i++) {
        const pokemonData = allPokemonData[i];
        const pokemonCard = createPokemonCard(pokemonData);
        pokemonListElement.appendChild(pokemonCard);
    }
    displayedPokemonCount = end;
    if (displayedPokemonCount >= allPokemonData.length) {
        document.getElementById("loadMoreBtn").style.display = 'none';
    }
}

function loadMorePokemon() {
    displayPokemon();
}

function createPokemonCard(pokemonData) {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");

    const pokemonTypes = pokemonData.types.map(typeInfo => typeInfo.type.name).join(", ");
    pokemonData.types.forEach(typeInfo => {
        pokemonCard.classList.add(`type-${typeInfo.type.name}`);
    });

    const imageUrl = getPokemonImageUrl(pokemonData.id);

    pokemonCard.innerHTML = `
        <h3>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h3>
        <img src="${imageUrl}" alt="${pokemonData.name}">
        <p>ID #${pokemonData.id}</p>
        <p>${pokemonTypes}</p>
    `;

    pokemonCard.addEventListener("click", () => {
        currentCardIndex = allPokemonData.findIndex(p => p.id === pokemonData.id);
        expandCard(pokemonData);
    });

    return pokemonCard;
}

function generatePage2HTML(pokemonData) {
    return pokemonData.stats.map(createProgressBar).join("");
}

function showPage(pageNumber, pokemonData) {
    const pageContentDiv = document.querySelector('.pokemon-card.expanded .page-content');
    if (pageNumber === 1) {
        pageContentDiv.innerHTML = generatePage1HTML(pokemonData);
    } else if (pageNumber === 2) {
        pageContentDiv.innerHTML = generatePage2HTML(pokemonData);
    }
}

function getPokemonData(pokemonId) {
    return allPokemonData.find(pokemon => pokemon.id === pokemonId);
}

function prevPage(pokemonId) {
    const pokemonData = getPokemonData(pokemonId);
    if (currentPage[pokemonId] > 1) {
        currentPage[pokemonId]--;
        showPage(currentPage[pokemonId], pokemonData);
    }
}

function nextPage(pokemonId) {
    const pokemonData = getPokemonData(pokemonId);
    if (currentPage[pokemonId] < 2) {
        currentPage[pokemonId]++;
        showPage(currentPage[pokemonId], pokemonData);
    }
}

function openOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.classList.remove('d-none'); // Overlay anzeigen
    document.body.style.overflow = "hidden"; // Hintergrund nicht mehr scrollbar machen
}

function closeOverlay(event) {
    const overlay = document.getElementById("overlay");
    if (event.target === overlay) {
        overlay.classList.add('d-none'); // Overlay ausblenden
        document.body.style.overflow = "auto"; // Hintergrund wieder scrollbar machen
    }
}

function expandCard(pokemonData) {
    openOverlay(); // Overlay öffnen

    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon-card", "expanded");

    const pokemonTypes = pokemonData.types.map(typeInfo => typeInfo.type.name).join(", ");
    const typeClass = pokemonData.types.map(typeInfo => `type-${typeInfo.type.name}`).join(" ");

    currentPage[pokemonData.id] = 1;

    pokemonDiv.innerHTML = createPokemonDiv(pokemonData, typeClass, pokemonTypes);
    const cardContentDiv = document.getElementById("card-content");
    cardContentDiv.innerHTML = "";
    cardContentDiv.appendChild(pokemonDiv);

    showPage(currentPage[pokemonData.id], pokemonData);
}

function nextCard(event) {
    event.stopPropagation();
    currentCardIndex = (currentCardIndex + 1) % allPokemonData.length;
    expandCard(allPokemonData[currentCardIndex]);
}

function prevCard(event) {
    event.stopPropagation();
    currentCardIndex = (currentCardIndex - 1 + allPokemonData.length) % allPokemonData.length;
    expandCard(allPokemonData[currentCardIndex]);
}