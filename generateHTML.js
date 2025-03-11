function createProgressBar(stat) {
    const level = Math.floor(stat.base_stat / 1);
    return `
        <div class="progress-bar-container">
            <div class="progress-bar-label">${stat.stat.name}:</div>
            <div class="progress-bar-wrapper">
                <progress class="progress-bar" max="100" value="${stat.base_stat}"></progress>
                <div class="level">${level}</div>
            </div>
        </div>
    `;
}

function generatePage1HTML(pokemonData) {
    return `
        <div class="generated-page">
            <p>ID #${pokemonData.id}</p>
            <p>Height: ${pokemonData.height}</p>
            <p>Weight: ${pokemonData.weight}</p>
        </div>
    `;
}

function createPokemonDiv(pokemonData, typeClass, pokemonTypes) {
    const imageUrl = getPokemonImageUrl(pokemonData.id);

    return `
        <div class="header ${typeClass}">
            <h2>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
            <img src="${imageUrl}" alt="${pokemonData.name}">
            <div class="buttons-top">
                <button class="prev-page" onclick="prevPage(${pokemonData.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e57640">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                    </svg>
                </button>
                <button class="next-page" onclick="nextPage(${pokemonData.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e57640">
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                    </svg>
                </button>
            </div>
        </div>
       
        <div class="details">
            <p class="description-type ${typeClass}">${pokemonTypes}</p>
            <div class="page-content">
                <!-- Hier wird der Inhalt der Seite 1 oder 2 eingefügt -->
            </div>
            <div class="buttons">
                <button class="prev-page" onclick="prevPage(${pokemonData.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e57640">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                    </svg>
                </button>
                <button class="next-page" onclick="nextPage(${pokemonData.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e57640">
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}