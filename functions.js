function removeAllFromList(list)
{
    let child=list.firstElementChild,completed=false;
    while(child)
    {
        list.removeChild(child);
        child=list.firstElementChild;
    }
}

function filterViewInfo()
{
    if(active === "showAll")
    {
        return listInfo.filter((char) => char !== null);
    }
    if(active === "remaining")
    {
        return listInfo.filter((char) => ((char !== null) && (char.checked === 0)));
    }
    if(active === "completed")
    {
        return listInfo.filter((char) => ((char !== null) && (char.checked === 1)));
    }
}

function render()
{
    list=document.createElement("ul")
    ///removeAllFromList(list);
    const viewInfo=filterViewInfo();
    let completed = false;

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
        // newItem.contentEditable =true;
        newItem.setAttribute("id",[viewInfo[i].id]);
        newItem.style.paddingBottom="10px";
        newItem.appendChild(checkBox);
        newItem.appendChild(textNode);
        newItem.appendChild(span);

        list.appendChild(newItem);
        if(viewInfo[i].checked)
        {
            newItem.style.backgroundColor="#C0E648";
            completed=true;
        }
    }