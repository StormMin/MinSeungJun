const todoForm=document.querySelector("#todo-form");
const todoList=document.querySelector("#todo-list");
const toDOInput=document.querySelector("#todo-form input"); 
const TODOSKEY="toDos"
let toDos=[];

function saveToDos(){
    localStorage.setItem(TODOSKEY,JSON.stringify(toDos)) ;
}
function deleteTodo(event){
    const d=event.target;
    const li=event.target.parentElement;
   const DeltoDos=toDos.filter(function(element,index){
       console.log(element);
       console.log(li);
        return element!==li.id;
    })
    console.log(DeltoDos);
    toDos=DeltoDos;
    li.remove();
    saveToDos();
}

function paintTODO(newTodo){
    const li= document.createElement("li");
    const span=document.createElement("span");
    const button=document.createElement("button");
    li.id=newTodo;
    button.innerText="X";
    button.addEventListener("click",deleteTodo);
    li.appendChild(span);
    li.appendChild(button);
    span.innerText=newTodo;
    todoList.appendChild(li);
}

function handletodosubmit(event){
    event.preventDefault();
    const newTodo=toDOInput.value;
    toDOInput.value="";
    toDos.push(newTodo);
    paintTODO(newTodo);
    saveToDos();
}
todoForm.addEventListener("submit",handletodosubmit);
const savedToDos=localStorage.getItem(TODOSKEY)
if (savedToDos!==null){
    const parsedToDos=JSON.parse(savedToDos);
    parsedToDos.forEach(paintTODO);
    toDos=parsedToDos;
}