let listInfo=[];
// {id => arrayIndex
// info => input texts
// checked=> completed or not}



// ***** RENDERING FUNCTION *****

function render(viewInfo)
{
    list=document.getElementById("list");
    let child=list.firstElementChild,completed=false;
    while(child)
    {
        list.removeChild(child);
        child=list.firstElementChild;
    }
    for(let i=0;i<viewInfo.length;i++)
    {
        if(viewInfo[i]===null)continue;
        let textNode=document.createTextNode(viewInfo[i].info);

        let checkBox=document.createElement('input');
        checkBox.type="checkbox";
        checkBox.style.display='none';
        checkBox.checked=viewInfo[i].info;
        
        let span=document.createElement('span');
        span.className="close";
        span.appendChild(document.createTextNode('x'));
        span.style.fontSize="20px";

        let newItem=document.createElement('li');
        newItem.setAttribute("id",[i]);
        newItem.style.paddingBottom="10px";
        newItem.appendChild(checkBox);
        newItem.appendChild(textNode);
        newItem.appendChild(span);

        document.getElementById('list').appendChild(newItem);
        if(viewInfo[i].checked)
        {
            newItem.style.backgroundColor="#C0E648";
            completed=true;
        }
    }
    if(completed)
    {
        let clearCompletd=document.getElementById('clearCompleted');
        clearCompletd.style.display="inline-flex";
    }
    else
    {
        let clearCompletd=document.getElementById('clearCompleted');
        clearCompletd.style.display="none";
    }
}



// *** ADD ITEM TO THE LIST AFTER PRESSING THE "ADD" BUTTON ****

function addOnClick(event)
{
    event.preventDefault();
    let inputBox=document.getElementById('inputBox');
    let text=inputBox.value;
    
    if( text !== "" )
    {
        inputBox.value="";
        addToArray(text);
        render(listInfo);
        // clearButtonActivation();
    }
}

let add=document.getElementById('add');

add.addEventListener('click',addOnClick);

function addToArray(text)
{
    let len=listInfo.length;
    listInfo.push({id:len, info: text, checked: false});
}

// *** ADDING EVENTLISTENER FUNCTION ON THE LIST ***

let list=document.getElementById("list");

list.addEventListener('click',removeItem);



function removeItem(event)
{
    let elem=event.target;
    console.log(elem);
    if(elem.className=="close")
    {
        let id=elem.parentElement.id;
        listInfo[id]=null;
    }
    else
    {
        let id=elem.id;
        listInfo[id].checked ^= true;
    }
    render(listInfo);
}

