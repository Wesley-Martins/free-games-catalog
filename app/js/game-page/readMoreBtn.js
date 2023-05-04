const readBtn = document.getElementById('read-btn');
const summaryDesc = document.getElementById('summary-desc');

const thumbs = document.querySelectorAll('.sidebar__thumbs');
const thumbUp = document.getElementById('thb-up');
const thumbDown = document.getElementById('thb-down');

thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        const id = thumb.id;
        
        switch(id) {
            case 'thb-up':
                thumb.classList.toggle('up');
                thumbDown.classList.remove('down');
                break;
            case 'thb-down':
                thumb.classList.toggle('down');
                thumbUp.classList.remove('up');
        }
    })
})

readBtn.addEventListener('click', () => {
    if(summaryDesc.classList.contains('expanded')) {
        readBtn.innerHTML = '+ Read More';
    }
    else {
        readBtn.innerHTML = '- Read Less';
    };

    summaryDesc.classList.toggle('expanded');
})

