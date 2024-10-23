export class Tree{
    constructor(data, depth){
        this.data = data;
        this.depth = depth ?? 0;
        this.children = [];
    }
    addChild(subtree){
        this.children.push(subtree)
    }
}
export class Subject{
    constructor(title, description, url){
        this.title = title ?? 'Untitled';
        this.description = description ?? 'No Description';
        this.url = url ?? 'about:blank';
    }
}