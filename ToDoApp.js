// let checkCount=0;

// *** ADD ITEM TO THE LIST AFTER PRESSING THE "ADD" BUTTON ****

let add=document.getElementById('add');

add.addEventListener('click',function(event){
    event.preventDefault();
    let text=document.getElementById('inputBox').value;
    
    if( text !== "" )addToList(text);
    document.getElementById('inputBox').value="";
});

function addToList(text)
{
    let textNode=document.createTextNode(text);

    let checkBox=document.createElement('input');
    checkBox.type="checkbox";
    
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
    checkItem(newItem);
    removeItem(newItem);
}

// *** REMOVE THE ITEM AFTER PRESSING THE "X" BUTTON ***

function removeItem(item)
{
    let closebtn =item.lastElementChild;

    closebtn.addEventListener('click', function(){
    item.parentElement.removeChild(item);
    });
}

// *** CHANGING THE BACKGROUND COLOR OF THE ITEM ***

function backgroundcolor(item){
    let check=item.firstElementChild;
    if(check.checked)
    {
        item.style.background="#83c26a";
        showClearCompletedTaskButton();
    }
    else 
    {
        item.style.background="#f6f6f6";
        if(allItemUnchecked())hideClearCompletedTaskButton();
    }

}

// *** CHECK IF ANY ITEM IS CHEKED IN THE LIST ***

function allItemUnchecked()
{
    list=document.getElementById("list");

    for(let keys of list.children)
    {
        if(keys.firstElementChild.checked)return false;
    }
    return true;
}

// *** MARKING/UNMARKING THE CHECKED ITEMS ***

function checkItem(item)
{
    let check=item.firstElementChild;
    check.addEventListener('click',function(){
        backgroundcolor(item);
    });
}

// *** SHOW "CLEAR COMPLETED TASK" BUTTON ***

function showClearCompletedTaskButton()
{
    let clearCompletd=document.getElementById('clearCompleted');
    clearCompletd.style.display="inline-flex";
}

// *** HIDE "CLEAR COMPLETED TASK" BUTTON ***

function hideClearCompletedTaskButton()
{
    let clearCompletd=document.getElementById('clearCompleted');
    clearCompletd.style.display="none";
}

// *** SELECTING ALL THE CHECKED ITEMS USING "SELECT ALL" BUTTON ***

let selectAllButton =  document.getElementById("selected");

selectAllButton.addEventListener("click",function(){
    list=document.getElementById("list");
    let bit=true;
    for(let keys of list.children)
    {
        if(!keys.firstElementChild.checked)
        {
            bit=false;
            keys.firstElementChild.checked=true;
            backgroundcolor(keys);
        }
    }
    if(bit===true)
    {
        for(let keys of list.children)
        {
                keys.firstElementChild.checked=false;
                backgroundcolor(keys);
        }
    }

});


// *** SHOW REMAINING TASKS ONLY USING "REMAINING TASK" BUTTON ***

let remainingTaskButton=document.getElementById("remaining");

remainingTaskButton.addEventListener('click',function(){
    list=document.getElementById("list");

    for(let key of list.children)
    {
        if(key.firstElementChild.checked)key.style.display='none';
        else key.style.display='block';
    }
});

// *** SHOW COMPLETED TASKS ONLY USING "COMPLETED TASK" BUTTON ***

let completedTaskButton=document.getElementById("completed");

completedTaskButton.addEventListener('click',function(){
    list=document.getElementById("list");

    for(let key of list.children)
    {
        if(key.firstElementChild.checked)key.style.display='block';
        else key.style.display='none';
    }
});

// *** SHOW ALL TASKS ONLY USING "SHOW ALL" BUTTON ***

let showAllTaskButton=document.getElementById("all");

showAllTaskButton.addEventListener('click',function(){
    list=document.getElementById("list");

    for(let key of list.children)
    {
        key.style.display='block';
    }
});


// *** REMOVE COMPLETED TASKS AFTER CLICKING "CLEAR COMPLETED TASKS" BUTTON ***

let clearCompletedButton=document.getElementById("clearCompleted");

clearCompletedButton.addEventListener('click',function(){
    list=document.getElementById("list");

    for(let key of list.children)
    {
        if(key.firstElementChild.checked)key.parentElement.removeChild(key);
    }
});