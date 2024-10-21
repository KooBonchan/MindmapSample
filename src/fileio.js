document.getElementById('btn-upload').addEventListener('click', function(){
    document.getElementById('json-file-input').click();
})

document.getElementById('json-file-input').addEventListener('change', function(){
    const file = this.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = function(event){
        try{
            let data = parseJson(event.target.result)
            dealWithJson(data)
        } catch(error){
            alert('Error parsing JSON: ' + error.message);
        }
    }
})

function parseJson(target){
    return {};
}

function dealWithJson(){
    console.log("Dealt with JSON")
}