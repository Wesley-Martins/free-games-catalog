const openMenuBtns = document.querySelectorAll('.options__drop-btn');
const menus = document.querySelectorAll('.dropdown-menu');

const menuOptions = document.querySelectorAll('.dropdown-menu__btn');
let lastClickedOption;

function toggleDropdown(menu) {
    menu.classList.toggle('hidden');
}

document.addEventListener('click', (event) => {
    const element = event.target;

    menuOptions.forEach((option) => {
        if(element == option) { lastClickedOption = element; }
    });

    for(let i = 0; i < openMenuBtns.length; i++) {
        const btn = openMenuBtns[i];
        const menu = menus[i];

        switch(element) {
            case btn:
            case btn.firstElementChild:
                toggleDropdown(menu);
                break
            
            case lastClickedOption:
                if(btn.dataset.type == lastClickedOption.dataset.type) {
                    btn.innerHTML = lastClickedOption.innerText + '<i class="fa-solid fa-circle-chevron-down fa-lg"></i>';
                }
                break

            default:
                menu.classList.add('hidden');
        }
    } 
})

menuOptions.forEach(option => {
    option.addEventListener('click', (event) => {
       event.preventDefault();
       console.log(option.value);
    })
})
