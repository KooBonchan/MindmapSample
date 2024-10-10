const cards = document.querySelectorAll('.node');
const board = document.querySelector('#board');

class CytoHelper{
    
    CytoHelper(){}
    addNode(a){
        cy.add({
            group:'nodes',
            data: {id:a, label:a}
        });
        cy.center(a);
        layout.run()
    }
    addNodeTo(dest, src){
        cy.add({
            group:'nodes',
            data: {id:dest, label:dest}
        });
        cy.add({
            group: 'edges',
            data: {source: src, target: dest}
        });
        cy.center(dest);
        layout.run()
    }
}


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
    helper.addNode(cardId);
    console.log(cardId);
})

const cy = cytoscape({
    container: document.getElementById('board'),
    elements: [],
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
                'line': '#cccccc',
                'width': 3,
                'target-arrow-color': '#cccccc',
                'target-arrow-shape': 'triangle',
            }
        }
    ],

    layout: {
        name: 'random',
        rows: 1
    }
    
});
const helper = new CytoHelper();
var layout = cy.layout({name:'random',rows:'1'})