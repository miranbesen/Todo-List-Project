//Tüm elementleri seçme
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ //tüm eventlistener'lar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
}

function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text= listItem.textContent.toLowerCase();
    
        if(text.indexOf(filterValue)===-1){
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    
    });
}

function deleteTodo(e){
    
    // console.log(e.target);
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi...");
    }
}
function deleteTodoFromStorage(deleteTodo){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo===deleteTodo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos=getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const newTodo=todoInput.value.trim();

    if(newTodo===""){
        showAlert("danger","Lütfen bir todo girin...");
    }
    else{
      addTodoToUI(newTodo);
      addTodoStorage(newTodo);
      showAlert("success","Basariyla eklendi...");  
    }

    e.preventDefault(); //tekrardan sayfaya yönlenmemesini saglıyoruz.
}

function getTodosFromStorage(){ //storagedan bütün todo'ları alır.
    let todos;

    if(localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos")); //dizi olarak aldım.
    }
    return todos;
}

function addTodoStorage(newTodo){ //local storage'ye todos'ları ekliyor.
    let todos=getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos)); //string olarak verileri yazdım.
}

function showAlert(type,message){
            //     <div class="alert alert-primary" role="alert">
            //   This is a primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
            // </div>
    // debugger;
    const alert=document.createElement("div");
    alert.className='alert alert-'+type;
    alert.textContent=message;

    //window'un özelliği olan setTimeout
    firstCardBody.appendChild(alert);
    setTimeout(function(){
        alert.remove()
    },2000);
}


function addTodoToUI(newTodo){ //Aldığı stringi list item olarak eklemeye yarar UI'ya (Arayüze yani)

        //      <li class="list-group-item d-flex justify-content-between">
        //     Todo 1
        //     <a href = "#" class ="delete-item">
        //         <i class = "fa fa-remove"></i>
        //     </a>
        // </li>  
        const listItem=document.createElement("li"); //list itemi oluşturduk.
        //link oluşturma 
        const link=document.createElement("a");
        link.href="#";
        link.className="delete-item";
        link.innerHTML="<i class = 'fa fa-remove'></i>";

        listItem.className="list-group-item d-flex justify-content-between";
        listItem.appendChild(document.createTextNode(newTodo));
        listItem.appendChild(link);


        todoList.appendChild(listItem);
        
}

