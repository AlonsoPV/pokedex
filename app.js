const url = "https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json";
var pokemonBuscado = "";
let pokeNombre = '';
const pantallaPok = document.getElementById('pantalla-pok');
const inputBusqueda = document.getElementById('busqueda');
const botonBuscar = document.getElementById('buscar-pokemon');

function ingresaPokemon() {
    // Jala el pokemon desde el boton de buscar
    pokemonBuscado = document.getElementById("busqueda").value;

    fetch('./pokemon.json')  // no funciona con url
        .then(response => response.json())
        .then(data => {
            createCards(data);

            const pokemonEncontrado = data.find(pokemon => pokemon.name.toLowerCase() === pokemonBuscado.toLowerCase());

            if (pokemonEncontrado) {
                pokeNombre = pokemonEncontrado.name;
                console.log('Encontrado: ' + pokeNombre);
                mostrarPokemon(pokemonEncontrado); // Llama a la función para mostrar datos
            } else {
                pantallaPok.innerHTML = `<h2>Pokémon "${pokemonBuscado}" no encontrado.</h2>`;
            }
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud Fetch:', error);
            pantallaPok.innerHTML = `<h2>No se tiene registro de ese pokemon</h2>`;
        });
}

function mostrarPokemon(pokemon) {
    pantallaPok.innerHTML = `
        <div class="tarjeta-pokemon">
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.ThumbnailImage}" alt="${pokemon.name}">
            <p>Tipo: ${pokemon.type.join(', ')}</p><br>
            <button id="masInfo" >Mayor Información</button>
        </div>
    `;
}

let createCards = (data) => {
    var pokemonsContainer = document.getElementById('tarjetas');
    console.log(data)
    data.forEach((pokemon) => {
        let card = document.createElement('div');
        card.classList.add('tarjeta-pokemon'); // Agregar clase para estilizar

        let title = document.createElement('p');
        title.textContent = pokemon.name; // Asignar el nombre del Pokémon al párrafo

        let image = document.createElement('img');
        image.src = pokemon.ThumbnailImage; // Asignar la imagen del Pokémon

        card.append(title, image);
        pokemonsContainer.append(card);

    })
}

function deslpegarPokemons(pokemon) {
    createCards([pokemon]);
}






// Agrega el event listener al botón
//botonBuscar.addEventListener('click', ingresaPokemon);
botonBuscar.addEventListener('click', ingresaPokemon);