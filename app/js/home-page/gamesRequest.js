import { createGame } from "./createGames.js";

const params = new URL(window.location.href).search;
const endpoint = `https://free-to-play-games-database.p.rapidapi.com/api/games${params}`;
const requestOptions = {
    method: 'GET',
	headers: {
        'X-RapidAPI-Key': '2daa5fe94dmsh729c54c4ef11946p119ccfjsn7509d91280bd',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
}

const gamesContainerElement = document.querySelector('.games-container');
const gamesCounterElement = document.getElementById('games-counter');
let counter = 0;
let allGames = [];


async function requestAllGames() {
    try {
        let request = await fetch(endpoint, requestOptions);
        allGames = await request.json();

        allGames.forEach(game => {
            gamesContainerElement.innerHTML += '<div class="lazy"></div>';
            counter++;
        })
        gamesCounterElement.innerText = counter;

        const lazyElements = document.querySelectorAll('.lazy');
        for(let i = 0; i < 8; i++) {
            if(allGames[i]) {
                createGame(allGames[i], lazyElements[i]);
            }
        }
        
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => { el.remove() });
    } 
    catch(error) {
        console.log(error);

        history.pushState({}, '', window.location.pathname);
        location.reload();
    }
}
requestAllGames(endpoint);

export { allGames };
