const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todolist = document.getElementById("todolist");

let editTodo = null;

const addTodo = () => {
  //alert("hello");
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("you must write something");
    return false;
  }
  if (addBtn.value === "Edit") {
    editLocalTodo(editTodo.target.previousElementSibling.innerHTML);
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    //dom manipulation->create,delete,add
    const li = document.createElement("li");
    const p = document.createElement("p");

    p.innerHTML = inputText;
    //jo text likhenge vo li me add hojae
    li.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "edit");
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "delete");
    li.appendChild(deleteBtn);

    todolist.appendChild(li);
    //empty input box by entering a task to add a new one
    inputBox.value = "";

    saveToLocalStorage(inputText);
  }
};

const updateTodo = (e) => {
  //console.log(e.target.innerHTML);
  if (e.target.innerHTML === "Remove") {
    todolist.removeChild(e.target.parentElement);
    deleteLocalTodo(e.target.parentElement);
  }
  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
  }
};

const saveToLocalStorage = (todo) => {
  let todos;
  //console.log(localStorage.getItem("todos"));
  //console.log(JSON.parse(localStorage.getItem("todos")));//json string to json object
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  //console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodo = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      const li = document.createElement("li");
      const p = document.createElement("p");

      p.innerHTML = todo;
      li.appendChild(p);

      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add("btn", "edit");
      li.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove";
      deleteBtn.classList.add("btn", "delete");
      li.appendChild(deleteBtn);

      todolist.appendChild(li);
    });
  }
};

const deleteLocalTodo = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML;
  //console.log(todoText.children[0].innerHTML);
  let todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todoIndex);
};

const editLocalTodo = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", getLocalTodo);
addBtn.addEventListener("click", addTodo);
todolist.addEventListener("click", updateTodo);
