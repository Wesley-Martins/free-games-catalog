const gameId = new URLSearchParams(window.location.search).get('id');
const endpoint = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
const requestOptions = {
    method: 'GET',
	headers: {
        'X-RapidAPI-Key': '2daa5fe94dmsh729c54c4ef11946p119ccfjsn7509d91280bd',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
}

const loadingElements = document.querySelectorAll('.loading');
const gameBackground = document.getElementById('background');
const gameThumbnail = document.getElementById('game-thumbnail');
const gameLink = document.getElementById('game-link');
const textContent = document.querySelectorAll('.text-content');
const screenshotsUrl = [];

function browserRequirementsText(title) {
	const message = `
	<p>${title}, being a browser based game, should run smoothly on practically any PC with a updated web-browser.</p>

	<p>If you have old hardware or software, you may still be able to play ${title}, but your game experience may suffer. For the best gameplay experience, the latest versions of Firefox, Chrome, or Internet Explorer are recommended.</p>
	`;
	return message
}

function fillSystemRequirements(game) {
	const systemContainer = document.getElementById('system-container');
	const platform = game.platform;
	const requirementsExists = Boolean(game.minimum_system_requirements?.os);

	if(platform == 'Web Browser') {
		const title = game.title;
		systemContainer.innerHTML = browserRequirementsText(title);
	}
	else if(!requirementsExists) {
		systemContainer.parentElement.remove();
	};
}

function fillScreenshots(game) {
	const screenshotsContainer = document.getElementById('screenshots-container');
	const screenshots = document.querySelectorAll('.screen-imgs');

	if(game.screenshots[0]) {
		gameBackground.style.backgroundImage = `url("${game.screenshots[0].image}")`;

		for(let i = 0; i < screenshots.length; i++) {
			const imgUrl = game.screenshots[i].image;

			screenshotsUrl.push(imgUrl);
			screenshots[i].src = imgUrl;
		}
	} 
	else {
		screenshotsContainer.remove()
	}
}

function fillGamePage(game) {
	fillSystemRequirements(game);
	fillScreenshots(game);

	gameThumbnail.src = game.thumbnail;
	gameLink.href = game.game_url;

	textContent.forEach(el => {
		const content = game.minimum_system_requirements?.[el.dataset.value] ?? game[el.dataset.value];
		el.textContent = content;
	});
	loadingElements.forEach(el => { el.remove() });
}

async function requestGame() {
	try {
		let request = await fetch(endpoint, requestOptions);
		let game = await request.json();

		fillGamePage(game);
	} 
	catch(error) {
		history.pushState({}, '', '/app/index.html');
		location.reload();
	}
}
requestGame()

export { screenshotsUrl };
