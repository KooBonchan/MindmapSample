import {Tree, Subject} from './structure.js';

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

function parseJsonToTree(target){
    function parseHelper(target, level){
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
    return parseHelper(target, 0)
}

function dealWithJson(){
    console.log("Dealt with JSON")
}