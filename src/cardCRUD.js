const nodes = []
const roots = []

export function createCard(original){
    if(original instanceof Subject){
        createCardFromSubject(original)
    }
    else if (original instanceof Tree){
        createCardFromTree(original)
    }else{
        throw new TypeError('Expected an instance of Subject or Tree')
    }
}

function createCardFromSubject(subject, depth = 0){
    // TODO:
    console.log('do stuff')
}

function createCardFromTree(tree){
    createCardFromSubject(tree.data);
    tree.children.forEach((child) => createCardFromTree(child))
}