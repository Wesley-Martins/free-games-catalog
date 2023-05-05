import { screenshotsUrl } from './gameIdRequest.js';

const carousel = document.getElementById('carousel-container');
const screenshots = document.querySelectorAll('.screen-imgs');
const carouselImg = document.getElementById('carousel-img');
const carouselArrows = document.querySelectorAll('[data-car-arrow]');

let currentIndex = 0;

screenshots.forEach(img => {
    img.addEventListener('click', () => {
        const imgUrl = img.src;
        
        carouselImg.src = imgUrl;
        carousel.classList.remove('hidden');
        currentIndex = screenshotsUrl.findIndex(url => url == img.src);
    });
});

carouselArrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        const arrowValue = arrow.dataset.carArrow;
        
        switch(arrowValue) {
            case 'left':
                currentIndex--;
                break;
            case 'right':
                currentIndex++;
        }
        const i = currentIndex;
        currentIndex = i < 0 ? screenshotsUrl.length - 1 : i > screenshotsUrl.length - 1 ? 0 : i;

        carouselImg.src = screenshotsUrl[currentIndex];
    });
});

carousel.addEventListener('click', (event) => {
    const clicked = event.target;

    if(!Array.from(carouselArrows).includes(clicked) && clicked != carouselImg) {
        carousel.classList.add('hidden');
    };
});
