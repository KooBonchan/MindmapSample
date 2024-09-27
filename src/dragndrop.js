const cards = document.querySelectorAll('.card.node');
const board = document.querySelector('.board');

cards.forEach((card, index) => {
    card.addEventListener('dragstart', e=>{
        e.dataTransfer.setData('text/plain', card.id);
        e.target.style.opacity = '0.5';
    });
    card.addEventListener('dragend',(e)=>{
        e.target.style.opacity = '';
    });
});

board.addEventListener('dragover', e=>{
    e.preventDefault();
});

board.addEventListener('drop', e =>{
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    const draggedCard = document.getElementById(cardId);
    const clone = draggedCard.cloneNode(true);

    clone.id = '${cardId}-copy';
    clone.style.opacity = '';
    board.appendChild(clone);
})