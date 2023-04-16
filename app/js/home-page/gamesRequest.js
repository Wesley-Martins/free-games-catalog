let allGames = [];
let endpoint = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
let counter = 0;

const requestOptions = {
    method: 'GET',
	headers: {
        'X-RapidAPI-Key': '2daa5fe94dmsh729c54c4ef11946p119ccfjsn7509d91280bd',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
}

const gamesContainerElement = document.querySelector('.games-container');
const gamesCounterElement = document.getElementById('games-counter');

async function requestAllGames(endpoint) {
    try {
        let request = await fetch(endpoint, requestOptions);
        allGames = await request.json();

        allGames.forEach(game => {
            counter++
            createGame(game);
        })
        gamesCounterElement.innerText = counter;
    } 
    catch(error) {
        console.log(error);
    }
}

async function createGame(game) {
    const platformIcon = game.platform == 'PC (Windows)' ? 'fa-brands fa-windows' : 'fa-solid fa-window-maximize';

    gamesContainerElement.innerHTML += `
    <div class="card">
        <div class="card__img-wrapper"><img class="card__img" src="${game.thumbnail}" alt=""></div>
        <div class="card__body">
            <a class="card__game-title" href="./game.html"><h4>${game.title}</h4></a>
            <p class="card__desc">${game.short_description}</p>
            <div class="card__icons">
                <span class="card__genre">${game.genre}</span>
                <i class="${platformIcon} fa-lg"></i>
            </div>
        </div>
    </div>
    `
}

requestAllGames(endpoint);
