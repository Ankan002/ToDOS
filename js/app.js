//Selectors
const todoInput= document.querySelector('.todo-input');
const todoButton= document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
const filterOption= document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)

//Functions
function addTodo(event){
    //preventDefault prvents from default reloading
    event.preventDefault();

    //Creating the ToDo div
    const todoDiv= document.createElement('div');
    todoDiv.classList.add('todo');

    //Create ToDo Li
    const newTodo= document.createElement('li');
    newTodo.innerText= todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add TODO to Local Storage
    saveLocalTodo(todoInput.value);

    //CheckMark Button
    const completedButton= document.createElement('button');
    completedButton.innerHTML= '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //Trash Button
    const trashButton= document.createElement('button');
    trashButton.innerHTML= '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append to List
    todoList.appendChild(todoDiv);

    //Clearing todo input
    todoInput.value='';
}


function deleteCheck(e){
    const item = e.target;

    //Delete TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    //Comepete TODO and putting the check Mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;

            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
                
            case "incompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;    
        
            default:
                break;
        }
    });
}


function saveLocalTodo(todo){
    //Check: Is a TODO already there?
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
    //Check: Is a TODO already there?
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        //Creating the ToDo div
    const todoDiv= document.createElement('div');
    todoDiv.classList.add('todo');

    //Create ToDo Li
    const newTodo= document.createElement('li');
    newTodo.innerText= todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //CheckMark Button
    const completedButton= document.createElement('button');
    completedButton.innerHTML= '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //Trash Button
    const trashButton= document.createElement('button');
    trashButton.innerHTML= '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append to List
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    //Check: Is a TODO already there?
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}