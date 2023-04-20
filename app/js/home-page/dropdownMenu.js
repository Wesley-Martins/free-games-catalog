const openMenuBtns = document.querySelectorAll('.options__drop-btn');
const menus = document.querySelectorAll('.dropdown-menu');
const menuOptions = document.querySelectorAll('.dropdown-menu__btn');

function toggleDropdown(menu) {
    menu.classList.toggle('hidden');
}

document.addEventListener('click', (event) => {
    const element = event.target;

    for(let i = 0; i < openMenuBtns.length; i++) {
        const btn = openMenuBtns[i];
        const menu = menus[i];

        switch(element) {
            case btn:
            case btn.firstElementChild:
                toggleDropdown(menu);
                break

            default:
                menu.classList.add('hidden');
        }
    } 
})

export { menuOptions, openMenuBtns };
