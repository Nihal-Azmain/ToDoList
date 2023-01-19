let add=document.getElementById('add');

add.addEventListener('click',function(event){
    event.preventDefault();
    let text=document.getElementById('inputBox').value;
    // console.log(text);
    if( text !== "" )addToList(text);
    document.getElementById('inputBox').value="";
});



function addToList(text)
{
    let textNode=document.createTextNode(text);

    let span=document.createElement('span');
    span.className="close";
    span.appendChild(textNode);
    span.style.fontSize="20px";

    let newItem=document.createElement('li');
    newItem.style.paddingBottom="10px";
    newItem.appendChild(span);

    document.getElementById('list').appendChild(newItem);
}