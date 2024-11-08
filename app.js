const url = "https://pokeapi.co/api/v2/pokemon?limit=5";
let pokemonBuscado = "";
let pokeNombre = '';
const pantallaPok = document.getElementById('pantalla-pok');
const inputBusqueda = document.getElementById('busqueda');
const botonBuscar = document.getElementById('buscar-pokemon');
const botonBorrar = document.getElementById('borrar-pokemon');
const pokemonsContainer = document.getElementById('pantalla-pok');

// Variable global para almacenar los datos de Pokémon
let pokemonData = [];

// Función para buscar y mostrar un Pokémon específico
function ingresaPokemon() {
    pokemonBuscado = inputBusqueda.value.toLowerCase();
    // Buscar en los datos almacenados
    const pokemon = pokemonData.find(p => p.name === pokemonBuscado);

    if (pokemon) {
        mostrarPokemon(pokemon.url);
    } else {
        pantallaPok.innerHTML = `<h2>Pokémon "${pokemonBuscado}" no encontrado.</h2>`;
    }
}

// Mostrar tarjeta buscada
function mostrarPokemon(pokemonUrl) {
    fetch(pokemonUrl)
        .then(response => response.json())
        .then(pokemon => {
            pantallaPok.innerHTML = `
                    <div class="tarjeta-pokemon">
                        <h2>${pokemon.name}</h2>
                        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                        <p>Tipo: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                        <button class="masInfo">Mayor Información</button>
                    </div>
                `;
        })
        .catch(error => {
            console.error('Error al obtener detalles del Pokémon:', error);
            pantallaPok.innerHTML = `<h2>No se pudo obtener información del Pokémon.</h2>`;
        });
}

// Función para crear tarjetas de Pokémon de la lista inicial
function createCards(data) {
    pokemonData = data.results; // Almacena los datos en la variable global
    if (!pokemonsContainer) {
        console.error("Error: El contenedor de tarjetas 'contenido-pant' no se encuentra en el DOM.");
        return;
    }

    pokemonsContainer.innerHTML = '';
    data.results.forEach(pokemon => {
        mostrarPokemonInCard(pokemon.url);
    });
}

// Función para obtener detalles y crear una tarjeta de Pokémon
function mostrarPokemonInCard(pokemonUrl) {
    fetch(pokemonUrl)
        .then(response => response.json())
        .then(pokemon => {
            let card = document.createElement('div');
            card.classList.add('tablero-pokemon');
            card.innerHTML = `
                    <h2>${pokemon.name}</h2>
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <p>Tipo: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                    <button class="masInfo">Mayor Información</button>
                `;
            pokemonsContainer.append(card);
        })
        .catch(error => console.error('Error al obtener detalles del Pokémon:', error));
}

// Función para limpiar contenido y mostrar lista inicial
function borrarContenido() {
    pokemonsContainer.innerHTML = '';  // Limpia el contenido
    // Realiza una nueva solicitud para obtener los Pokémon
    fetch(url)
        .then(response => response.json())
        .then(data => createCards(data))  // Llama a createCards con los nuevos datos
        .catch(error => console.error('Hubo un problema con la solicitud Fetch:', error));
}

// Event listeners
botonBuscar.addEventListener('click', ingresaPokemon);
botonBorrar.addEventListener('click', borrarContenido);

document.addEventListener("DOMContentLoaded", () => {
    // Carga inicial de los Pokémon
    fetch(url)
        .then(response => response.json())
        .then(data => createCards(data))
        .catch(error => console.error('Hubo un problema con la solicitud Fetch:', error));
});