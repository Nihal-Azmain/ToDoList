let listInfo=[];
// {id => arrayIndex
// info => input texts
// checked=> completed or not (0/1)}
let active="showAll";


// ***** RENDERING FUNCTION *****

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

    document.getElementById("list").innerHTML = list.innerHTML;

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
        render();
    }
}

let add=document.getElementById('add');

add.addEventListener('click',addOnClick);

function addToArray(text)
{
    let len=listInfo.length;
    listInfo.push({id:len, info: text, checked: 0});
}

// **** ADDING EVENTLISTENER FUNCTION ON THE LIST ****

let list=document.getElementById("list");

clicks = 0, timer = null;

list.addEventListener('click',(event)=>
{
    clicks++;
    if(clicks === 1)
    {
        timer=setTimeout(()=>
        {
            updateList(event);
            clicks=0;
        },300);
    }
    else
    {
        clearTimeout(timer);
        activateInput(event);
        clicks=0;
    }
    event.stopPropagation();
});


// list.addEventListener('click',updateList);

function updateList(event)
{
    let elem=event.target;
    // console.log(elem);
    if(elem.className === "close")
    {
        let id=elem.parentElement.id;
        listInfo[id]=null;
    }
    else 
    {
        let id=elem.id;
        // console.log(listInfo[id]);
        if(listInfo[id]) {
            listInfo[id].checked ^= true;
        }
    }
    event.stopPropagation();
    render();
}

// **** ADDING EVENTLISTENER FUNCTION ON THE LIST ****

// list.addEventListener('dblclick',activateInput);

function activateInput(event)
{
    event.preventDefault();
    event.stopPropagation();
    let elem=event.target;
    console.log(elem);
    if(elem.className === "close")updateList(event);
    else
    {
        elem.innerHTML="";
        let id=elem.id;
        let inputBox=document.createElement("input");
        inputBox.type="text";
        elem.appendChild(inputBox);
        inputBox.focus();
        inputBox.addEventListener('focusout',(event)=>{
            if(event.target.value!=="")listInfo[id].info=event.target.value;
            render();
        });

        inputBox.addEventListener('keypress',(event)=>{
            if(event.key==="Enter")
            {
                if(event.target.value!=="")listInfo[id].info=event.target.value;
                render();
            }
        });
    }
    event.preventDefault();
    //render();
}




// **** FUNCTIONS TO CHANGE THE ACTIVE VALUE ****

function changeActive(event)
{
    active=this.id;
    resetAllButton();
    this.style.backgroundColor="#4CAF50";
    render();
}

function resetAllButton()
{
    remainingTaskButton.style.backgroundColor="#DDD4D4";
    completedTaskButton.style.backgroundColor="#DDD4D4";
    showAllButton.style.backgroundColor="#DDD4D4";
}

// **** ADDING EVENTLISTENER ON "REMAINING TASKS" BUTTON ****

let remainingTaskButton=document.getElementById("remaining");
remainingTaskButton.addEventListener('click',changeActive);

// **** ADDING EVENTLISTENER ON "COMPLETED TASKS" BUTTON ****

let completedTaskButton=document.getElementById("completed");
completedTaskButton.addEventListener('click',changeActive);

// **** ADDING EVENTLISTENER ON "SHOW ALL" BUTTON ****

let showAllButton=document.getElementById("showAll");
showAllButton.addEventListener('click',changeActive);

// **** ADDING EVENTLISTENER ON "ALL COMPLETED" BUTTON ****

let allCompletedButton= document.getElementById("completedAll");
allCompletedButton.addEventListener('click',checkAllTasks);

function checkAllTasks(event)
{
    let allValue=0;
    for(let i=0;i<listInfo.length;i++)
    {
        if(listInfo[i]===null)continue;
        if(!listInfo[i].checked)
        {
            allValue=1;
        }
    }

    for(let i=0;i<listInfo.length;i++)
    {
        if(listInfo[i]===null)continue;
        listInfo[i].checked=allValue;
    }    
    render();
}

// **** ADDING EVENTLISTENER ON "CLEAR COMPLETED TASKS" BUTTON ****

let clearCompletedButton= document.getElementById("clearCompleted");
clearCompletedButton.addEventListener('click',removeCompletedTasks);

function removeCompletedTasks(event)
{
    for(let i=0;i<listInfo.length;i++)
    {
        if(listInfo[i]===null)continue;
        if(listInfo[i].checked === 1)listInfo[i]=null;
    }    
    render();
}
