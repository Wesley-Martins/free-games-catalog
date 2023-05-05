import { allGames } from "./gamesRequest.js";

function createGame(game, lazyElement) {
    const platformIcon = game.platform == 'PC (Windows)' ? 'fa-brands fa-windows' : 'fa-solid fa-window-maximize';

    lazyElement.innerHTML = `
    <div class="card__img-wrapper"><img class="card__img" src="${game.thumbnail}" alt="${game.title} thumbnail"></div>
    <div class="card__body">
        <a class="card__game-title" href="./game.html?id=${game.id}"><h4>${game.title}</h4></a>
        <p class="card__desc">${game.short_description}</p>
        <div class="card__icons">
            <span class="card__genre">${game.genre}</span>
            <i class="${platformIcon} fa-lg"></i>
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
            const currentGame = document.querySelectorAll('.card').length;
            createGame(allGames[currentGame], element);
        }
    })
});

export { createGame };
