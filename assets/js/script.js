
document.querySelector('.dark-light-box').addEventListener("click", ()=>{
    document.querySelector('.todo-section').classList.toggle('dark_mode');
    const root = document.documentElement;

    if (document.querySelector('.todo-section').classList.contains('dark_mode')) {
        root.style.setProperty('--White-color', '#000000');
        root.style.setProperty('--Black-color', '#FFFFFF');
        root.style.setProperty('--backgrolund_color', 'rgba(82, 82, 82, 0.6)');
        root.style.setProperty('--backgrolund_color1', 'rgba(82, 82, 82, 0.6)');
    }
    else{
        root.style.setProperty('--White-color', '#FFFFFF');
        root.style.setProperty('--Black-color', '#000000');
        root.style.setProperty('--backgrolund_color', 'rgba(255, 255, 255, 0.6)');
        root.style.setProperty('--backgrolund_color1', '#e7e7e7');
    }
    
    
});




let blank_taskList= document.createElement('p');
    blank_taskList.innerHTML="Empty Task";
    blank_taskList.classList.add('empty');


document.addEventListener("DOMContentLoaded", function () {
    getData();
});

document.querySelector('#add-button').addEventListener('click', addTask);


// Function to add a task to the list
function addTask() {
    const taskInput = document.getElementById("todo-input");
    const taskText = taskInput.value.trim();
    const taskList = document.getElementById("todo-list");
   
    if (taskText.length > 5 && taskText !== "") {
        if (blank_taskList !=null) {
            blank_taskList.remove();
        }

        let todo_item=document.createElement('li')
        let id=Date.now();

        todo_item.classList.add('todo-item');
        todo_item.setAttribute('id', `${id}`) 

        todo_item.innerHTML = `
            <input class="form-check-input" type="checkbox" id="fdgfdg" onclick="checkTask(this)">
            <p>
                
                <span class="main-content">
                    <span class="content">${taskInput.value}</span>
                    <input type="text" value="${taskInput.value}">   
                </span>

                <span class="right-icon">
                    <i class="fa-solid fa-pen-to-square" onclick="editTask(this)"></i> <i class="fa-solid fa-trash-can" onclick="deleteTask(this)"></i>
                </span> 
            </p>
        `;

        saveData(id, taskInput.value);
        

        if (blank_taskList !=null) {
            blank_taskList.remove();
        }
        
 
        taskList.prepend(todo_item);
        
        // Clear the input field
        taskInput.value = "";
    }
    else{
        // Trigger the toast
        showToast("Please enter a task before adding it!", 3000);

    }
}


// Function to delete a task
function deleteTask(d_button) {
    document.querySelector('#confirmModal').classList.add('show');

    document.querySelector('#confirmButton').addEventListener('click', ()=>{confirmDelet(d_button)})

    document.querySelector('#cancelButton').addEventListener('click', ()=>{
        document.querySelector('#confirmModal').classList.remove('show');
    });

};

function confirmDelet(d_button) {

    const taskItem = d_button.parentElement.parentElement.parentElement;
    let d_itm_id=taskItem.getAttribute('id');

    deleteData(d_itm_id)
    taskItem.remove();

    const taskList = document.getElementById("todo-list");
    taskList.innerHTML==''? taskList.append(blank_taskList):'';
    
    document.querySelector('#confirmModal').classList.remove('show');
 }


// function confirmButton() {


// Function to complete a task
function checkTask(c_button) {
    console.log(c_button.value);
    
    
    c_button.parentElement.classList.toggle('complete');
    let c_itm_id=c_button.parentElement.getAttribute('id');
    
    checkData(c_itm_id, c_button.parentElement.classList.contains('complete'))
}


// Function to edit a task
function editTask(e_button) {
    
    let e_input = e_button.parentElement.parentElement.querySelector('.main-content input');
    let text_field= e_button.parentElement.parentElement.querySelector('.content')
    let edit_id=e_button.parentElement.parentElement.parentElement.getAttribute('id');
    // e_input.focus();
    

    let upade_btn=document.createElement('button')
    upade_btn.classList.add('upade_btn');
    upade_btn.innerHTML="save";

    e_button.parentElement.parentElement.classList.add('edit');
    e_button.parentElement.insertBefore(upade_btn, e_button);

    
    e_button.parentElement.querySelector('.upade_btn').addEventListener('click', ()=>{
        text_field.innerHTML=`${e_input.value}`
        e_button.parentElement.parentElement.classList.remove('edit');
        upade_btn.remove()
        editData(edit_id, e_input.value)
    })
}








// Function for getData
function getData() {
    const taskList = document.getElementById("todo-list");

    const todos = JSON.parse(localStorage.getItem("todos"));
    todos?.forEach(todos_data => {

        // const taskList = document.getElementById("todo-list");
        let todo_item=document.createElement('li');

        let complete_status= todos_data.complete == true ? 'todo-item complete':'todo-item';
        

        todo_item.setAttribute('class', `${complete_status}`)

        todo_item.setAttribute('id', `${todos_data.id}`) 

        todo_item.innerHTML = `
            <input class="form-check-input" type="checkbox" id="fdgfdg" onclick="checkTask(this)" ${todos_data.complete == true? 'checked':''}>
            <p>
                
                <span class="main-content">
                    <span class="content">${todos_data.text}</span>
                    <input type="text" value="${todos_data.text}">   
                </span>

                <span class="right-icon">
                    <i class="fa-solid fa-pen-to-square" onclick="editTask(this)"></i> <i class="fa-solid fa-trash-can" onclick="deleteTask(this)"></i>
                </span> 
            </p>
        `;
        taskList.prepend(todo_item);
    });

    taskList.innerHTML==''? taskList.append(blank_taskList):'';
}

// Function for complete task
function checkData(complete_id, is_complete) {

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo_item => {

        if (todo_item.id == complete_id) {
            todo_item.complete = is_complete;
        }

        return todo_item; 
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function for saveData
function saveData(save_item_id, addData) {
    let oldTodos = JSON.parse(localStorage.getItem("todos")) || [];

    let newTodo = {
        id: save_item_id,
        complete: false,
        text: addData 
    };
    
    oldTodos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(oldTodos));
}

// Function for editData
function editData(edit_id, newValue) {

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo_item => {

        if (todo_item.id == edit_id) {
            todo_item.text = newValue;
        }

        return todo_item; 
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function for deleteData
function deleteData(d_item_id) {
    console.log(d_item_id);
    
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter(todo_item => todo_item.id != d_item_id);
    localStorage.setItem('todos', JSON.stringify(todos));
   
}





function showToast(message, duration = 3000) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");
  
    toastMessage.textContent = message;
    toast.classList.add("show");
  
    setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
}
  




