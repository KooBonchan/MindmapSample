const cards = document.querySelectorAll('.node');
const board = document.querySelector('#board');

cards.forEach((card) => {
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
})

const cy = cytoscape({
    container: document.getElementById('board'),

    elements: [
        {data: {id:'a', label: 'Node A'}},
        {data: {id:'b', label: 'Node B'}},
        {data: {id:'c', label: 'Node C'}},
        {data: {source: 'a', target: 'b'}},
        {data: {source: 'b', target: 'c'}},
    ],

    style: [
        {
            selector: 'node',
            style: {
                'background-color': '#66cc66',
                'label': 'data(label)',
                'text-valign': 'center',
                'text-halign': 'center',
            }
        },
        {
            selector: 'edge',
            style: {
                'line': '#ccc',
                'width': 3,
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
            }
        }
    ],

    layout: {
        name: 'grid',
        rows: 1
    }
});