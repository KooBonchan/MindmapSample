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

let latestNodeId;

board.addEventListener('drop', e =>{
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    if(cardId !== undefined && cardId.length > 0){
        let node = addNode(cardId);
        latestNodeId = cardId;
    }  
})
/****************************/

const RandomLayoutJson = {
    name: 'random'
}
const cy = cytoscape({
    container: document.getElementById('board'),
    elements: [],
    style: [
        {
            selector: 'node',
            style: {
                'background-color': '#6c6',
                'label': 'data(label)',
                'text-valign': 'center',
                'text-halign': 'center',
                'width':'100px',
                'height':'100px',
            }
        },
        {
            selector: 'edge',
            style: {
                'border-color':'#cccccc',
                'width': 3,
                'target-arrow-color': '#cccccc',
                'target-arrow-shape': 'triangle',
            }
        },
        {
            selector: '.dragging',
            style: {
                'z-index': -1,
                'background-color':'#6a6'
            }
        }
    ],

    layout: RandomLayoutJson
    
});

let addNode = function(a){
    cy.add({
        group:'nodes',
        data: {id:a, label:a.toUpperCase()}
    })
    let elem = cy.getElementById(a)
    cy.center(elem);    
    cy.layout(RandomLayoutJson).run()
    return elem;
}

let connect = function (dest, src){
    cy.add({
        group: 'edges',
        data: {source: src, target: dest}
    });
    // cy.center(dest);
    cy.layout(RandomLayoutJson).run()
}

let dragnode;
cy.on('tapdrag', 'node', function(event){
    const node = event.target;
    dragnode = node;
    dragnode.addClass('dragging');
    event.preventDefault();
})
cy.on('tapend', function(event){
    const dest = event.target;
    if(dragnode == null || dest == null) return;
    if(dest.isNode === undefined) return;
    console.log(dest.isNode())
    console.log(dest.id());
    if(dest.isNode() && dest.id() != dragnode.id()){
        connect(dest.id(), dragnode.id())
    }
    dragnode.removeClass('dragging')
    dragnode = null;
})