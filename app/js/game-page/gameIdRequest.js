const gameId = new URLSearchParams(window.location.search).get('id');
const endpoint = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
const requestOptions = {
    method: 'GET',
	headers: {
        'X-RapidAPI-Key': '2daa5fe94dmsh729c54c4ef11946p119ccfjsn7509d91280bd',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
}

const gameBackground = document.getElementById('background');
const gameThumbnail = document.getElementById('game-thumbnail');
const gameLink = document.getElementById('game-link');
const gamePlatform = document.getElementById('platform');
const textContent = document.querySelectorAll('.text-content');
const screenshots = document.querySelectorAll('.screenshots__img');
const systemContainer = document.getElementById('system-container');

function browserSystemText(title) {
	const message = `
	<p>${title}, being a browser based game, should run smoothly on practically any PC with a updated web-browser.</p>

	<p>If you have old hardware or software, you may still be able to play ${title}, but your game experience may suffer. For the best gameplay experience, the latest versions of Firefox, Chrome, or Internet Explorer are recommended.</p>
	`;
	return message
}

function fillGamePage(game) {
	gameBackground.style.backgroundImage = `url("${game.screenshots[0].image}")`;
	gameThumbnail.src = game.thumbnail;
	gameLink.href = game.game_url;
	gamePlatform.innerHTML = game.platform == 'Windows' ? '(Windows)' : '(Web Browser)';

	if(game.platform == 'Web Browser') {
		const title = game.title;
		systemContainer.innerHTML = browserSystemText(title);
	}

	textContent.forEach(el => {
		const content = el.classList.contains('sys') ? 
		game.minimum_system_requirements[el.dataset.value] :
		game[el.dataset.value];

		el.innerHTML = content;
	});

	for(let i = 0; i < screenshots.length; i++) {
		const imgUrl = game.screenshots[i].image;
		screenshots[i].firstElementChild.src = imgUrl;
	};

}

async function requestGame() {
	try {
		let request = await fetch(endpoint, requestOptions);
		let game = await request.json();

		fillGamePage(game);
		console.log(game);
	} 
	catch(error) {
		console.log(error);
	}
}
requestGame()
