const themeBtn = document.getElementById('theme-btn');
const themeBtnIcon = themeBtn.firstElementChild;

themeBtn.addEventListener('click', () => {
    themeBtnIcon.classList.toggle('slide-right');
})
