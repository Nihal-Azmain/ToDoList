// ***ADD WORK TO THE LIST****

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

    let checkBox=document.createElement('input');
    checkBox.type="checkbox";
    checkBox.name=text;
    
    let span=document.createElement('span');
    span.className="close";
    span.appendChild(document.createTextNode('x'));
    span.style.fontSize="20px";

    let newItem=document.createElement('li');
    newItem.style.paddingBottom="10px";
    newItem.appendChild(checkBox);
    newItem.appendChild(textNode);
    newItem.appendChild(span);

    document.getElementById('list').appendChild(newItem);
    removeItem(newItem);
}

// ***REMOVE THE LIST AFTER PRESSING THE CLOSE BUTTON***

function removeItem(item)
{

    let closebtn =item.lastElementChild;
    // console.log(closebtn);

    closebtn.addEventListener('click', function(){
    event.preventDefault();
    item.parentElement.removeChild(item);
    });
}

