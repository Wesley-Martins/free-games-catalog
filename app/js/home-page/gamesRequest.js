let params = new URL(window.location.href).search;
let endpoint = `https://free-to-play-games-database.p.rapidapi.com/api/games${params}`;
let allGames = [];

const gamesContainerElement = document.querySelector('.games-container');
const gamesCounterElement = document.getElementById('games-counter');
let counter = 0;

const requestOptions = {
    method: 'GET',
	headers: {
        'X-RapidAPI-Key': '2daa5fe94dmsh729c54c4ef11946p119ccfjsn7509d91280bd',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
}

async function requestAllGames(endpoint) {
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

function createGame(game, lazyElement) {
    const platformIcon = game.platform == 'PC (Windows)' ? 'fa-brands fa-windows' : 'fa-solid fa-window-maximize';

    lazyElement.innerHTML = `
    <div class="card__img-wrapper"><img class="card__img" src="${game.thumbnail}" alt="${game.title} thumbnail"></div>
    <div class="card__body">
        <a class="card__game-title" href="./game.html"><h4>${game.title}</h4></a>
        <p class="card__desc">${game.short_description}</p>
            <div class="card__icons">
                <span class="card__genre">${game.genre}</span>
                <i class="${platformIcon} fa-lg"></i>
            </div>
        </div>
    </div>
    `;
    lazyElement.classList.replace('lazy', 'card');
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.bottom > 0 && rect.bottom - 200 <= window.innerHeight;
}

document.addEventListener('scroll', () => {
    const lazyElements = document.querySelectorAll('.lazy');
    
    lazyElements.forEach(element => {
        if(isInViewport(element)) {
            const CurrentGame = document.querySelectorAll('.card').length;
            createGame(allGames[CurrentGame], element);
        }
    })
});
