import { screenshotsUrl } from './gameIdRequest.js';

const carousel = document.getElementById('carousel-container');
const screenshots = document.querySelectorAll('.screen-imgs');
const closeBtn = document.getElementById('close-carousel');
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
        currentIndex = currentIndex < 0 ? screenshotsUrl.length - 1 :
        currentIndex > screenshotsUrl.length - 1 ? 0 : currentIndex;

        carouselImg.src = screenshotsUrl[currentIndex];
    });
})

closeBtn.addEventListener('click', () => { carousel.classList.add('hidden') });
