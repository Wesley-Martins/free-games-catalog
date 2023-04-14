const dropdownBtns = document.querySelectorAll('.options__drop-btn');
const dropdownMenus = document.querySelectorAll('.dropdown-menu');

document.addEventListener('click', (event) => {
    const element = event.target;

    for(let i = 0; i < dropdownBtns.length; i++) {
        if(element != dropdownBtns[i] && element != dropdownBtns[i].firstElementChild) {
            dropdownMenus[i].classList.add('hidden');
        }
        else {
            dropdownMenus[i].classList.toggle('hidden');
        }
    }
})
