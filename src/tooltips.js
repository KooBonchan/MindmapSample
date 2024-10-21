{

let tooltips = [
    {
        id:"btn-upload",
        tooltip:`
1. <strong>JSON Data Only</strong>: Ensure the file is in valid JSON format.
2. <strong>Tree-Shaped Structure</strong>: Data should follow a hierarchical structure.
3. <strong>Required Fields</strong>: Only the "Title", "Description", and "Url" fields are mandatory.
        `,
    },
]

const tooltip = document.createElement('div');
Object.assign(tooltip.style,
    {
        backgroundColor:'#333',
        color:'#fff',
        padding:'10px',
        borderRadius:'4px',
        whiteSpace:'pre-wrap',
        zIndex:'1000',
        display:'block',
        position: 'absolute',
    })
document.body.appendChild(tooltip)

tooltips.forEach(({id, tooltip:tooltipText}) =>{
    const button = document.getElementById(id);
    button.addEventListener('mouseenter', (e)=>{
        tooltip.innerHTML = tooltipText;
        tooltip.style.display = 'block';
        tooltip.style.left = `${e.pageX}px`;
        tooltip.style.top = `${e.pageY + 20}px`;
    })

    button.addEventListener('mousemove', (e)=>{
        tooltip.style.left = `${e.pageX}px`;
        tooltip.style.top = `${e.pageY + 20}px`;
    })
    button.addEventListener('mouseleave', (e)=>{
        tooltip.style.display = 'none';
    })
})

}