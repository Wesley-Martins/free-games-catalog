import { menuOptions, openMenuBtns } from "./dropdownMenu.js";

const titleElement = document.getElementById('title');

menuOptions.forEach(option => {
    option.addEventListener('click', (event) => {
        event.preventDefault();

        const key = option.dataset.type;
        const value = option.dataset.value;
        const params = new URLSearchParams(window.location.search);
        let newUrl;
        
        if(params.toString().includes(key)) {
            params.delete(key);
        };

        if(value == 'all') {
            newUrl = params == '' ? window.location.pathname : window.location.pathname + '?' + params.toString();
        }
        else {
            params.append(key, value);
            newUrl = window.location.pathname + '?' + params.toString();
        }

        history.pushState({}, '', newUrl);
        location.reload();
    })
});

window.addEventListener('popstate', () => {
    location.reload();
})

window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);

    params.forEach((value, key) => {
        const menuOption = Array.from(menuOptions).find(option => option.dataset.value == value);
        const menuBtn = Array.from(openMenuBtns).find(btn => btn.dataset.type == key);

        menuBtn.innerHTML = menuOption.innerText + '<i class="fa-solid fa-circle-chevron-down fa-lg"></i>';
    })

    const platformTitle = params.get('platform') ?? 'pc and browser';
    const categoryTitle = params.get('category') ?? '';
    const title = `The best free ${categoryTitle} games for ${platformTitle}!`;

    titleElement.innerHTML = title;
})
