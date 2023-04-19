const options = document.querySelectorAll('.dropdown-menu__btn');

options.forEach(option => {
    option.addEventListener('click', (event) => {
        event.preventDefault();

        const name = option.dataset.type;
        const value = option.dataset.value;
        const params = new URLSearchParams(window.location.search);
        let newUrl;
        
        if(params.toString().includes(name)) {
            params.delete(name);
        };

        if(value == 'all') {
            newUrl = params == '' ? window.location.pathname : window.location.pathname + '?' + params.toString();
        }
        else {
            params.append(name, value);
            newUrl = window.location.pathname + '?' + params.toString();
        }

        history.pushState({}, '', newUrl);
        location.reload();
    })
});

window.addEventListener('popstate', () => {
    location.reload();
})