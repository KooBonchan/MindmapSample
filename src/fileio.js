document.getElementById('btn-upload').addEventListener('click', function(){
    document.getElementById('json-file-input').click();
})

document.getElementById('json-file-input').addEventListener('change', function(){
    const file = this.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = function(event){
        try{
            let tree = parseJsonToTree(event.target.result)
            dealWithJson(tree)
        } catch(error){
            alert('Error parsing JSON: ' + error.message);
        }
    }
})

const sample = [
    {
        title: "Node 1",
        description: "Description for Node 1",
        url: "http://example.com/1",
        children: [
            {
                title: "Node 1.1",
                description: "Description for Node 1.1",
                url: "http://example.com/1.1",
                children: []
            },
            {
                title: "Node 1.2",
                description: "Description for Node 1.2",
                url: "http://example.com/1.2",
                children: []
            }
        ]
    },
    {
        title: "Node 2",
        description: "Description for Node 2",
        url: "http://example.com/2",
        children: []
    }
];

class Tree{
    constructor(data){
        this.data = data;
        this.children = [];
    }
    addChild(subtree){
        this.children.push(subtree)
    }
}
class Subject{
    constructor(title, description, url){
        this.title = title ?? 'Untitled';
        this.description = description ?? 'No Description';
        this.url = url ?? 'about:blank';
    }
}

function parseJsonToTree(target){
    if ( ! target) return null;
    if( ! Array.isArray(target)) target = [target];

    return target.map((v) => {
        const subject = new Subject(v.title, v.description, v.url);
        const tree = new Tree(subject);
        if(target.children && Array.isArray(target.children)){
            tree.children = parseJsonToTree(target.children);
        }
        return tree;
    })
}

function dealWithJson(){
    console.log("Dealt with JSON")
}