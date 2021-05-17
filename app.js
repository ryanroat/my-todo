/* eslint-disable linebreak-style */

// app constats
let tasks = [];

// DOM constants
const newTodo = document.querySelector('#newTodo'); // new task input field
const newTodoBtn = document.querySelector('#newTodoBtn'); // new task submit buttonconst
const taskItems = document.querySelector('.task-items'); // <ul> where tasks are displayed
// const darkmodeBtn = document.querySelector('#darkmodeBtn');
const LS = window.localStorage; // shortcut to localstorage API

// insert a task into DOM
function displayTask(taskObj) {
  // create and populate new <li> element
  const newLI = document.createElement('li');
  newLI.className = 'row';
  newLI.innerHTML = `
  <div class="seven columns">${taskObj.task}</div>
        <div class="two columns">
          <button class="edit data-ID=${taskObj.taskID}">Edit</button>
        </div>
        <div class="one columns">
          <button class="delete data-ID=${taskObj.taskID}">Delete</button>
        </div>
  `;
  // append new <li> element to DOM task list
  taskItems.appendChild(newLI);
  // clear new task input and set focus to same
  newTodo.value = '';
  newTodo.focus();
}

// load persistent tasks from local storage
function loadStoredTasks() {
  const storedTasks = JSON.parse(LS.getItem('tdtrack'));
  if (storedTasks) {
    tasks = storedTasks;
  }
  tasks.forEach((task) => {
    displayTask(task);
  });
}

// add task to local storage
function addStoredTask(task) {
  // append new task obj to tasks array
  tasks.push(task);
  // store tasks array to local storage
  LS.setItem('tdtrack', JSON.stringify(tasks));
}

// remove task from local storage
function removeStoredTask(ID) {
  // find and remove task from array matching task ID
  tasks.forEach((task, index) => {
    if (task.taskID === ID) {
      tasks.splice(index, 1);
    }
  });
  // store tasks array to local storage
  LS.setItem('tdtrack', JSON.stringify(tasks));
}

function newBtnClick() {
  const newTask = newTodo.value;
  if (newTask === '') {
    // message please enter a task
  }
  if (newTask !== '') {
    // store new task
    // local storage key is tdtrack - value will be json string of array of task objects
    // task objects consist of a task string and a hex timestamp ID
    const newTaskObj = {
      task: newTask,
      taskID: Date.now().toString(16),
    };
    // add task to local storage
    addStoredTask(newTaskObj);
    // display new task in DOM
    displayTask(newTaskObj);
  }
}

// edit and delete tasks
function taskOptions(event) {
  // check and run if delete was clicked
  if (event.target.classList.contains('delete')) {
    // get task ID from DOM delete button element
    const deleteID = event.target.classList[1].split('=')[1];
    // remove task from local storage
    removeStoredTask(deleteID);
    // remove selected task element from DOM
    event.target.parentElement.parentElement.remove();
  }

  // check and run if delete was clicked
  if (event.target.classList.contains('edit')) {
    // get task ID from DOM edit button element
    const editID = event.target.classList[1].split('=')[1];
    // remove task from local storage
    removeStoredTask(editID);
    // fill new task input with task text from task DOM element
    newTodo.value = event.target.parentElement.previousElementSibling.innerText;
    // remove task DOM element
    event.target.parentElement.parentElement.remove();
    // move focus to new task input element
    newTodo.focus();
  }

  event.preventDefault();
}

// event listeners
function startEventListeners() {
  document.addEventListener('DOMContentLoaded', loadStoredTasks);
  newTodoBtn.addEventListener('click', newBtnClick);
  taskItems.addEventListener('click', taskOptions);
}

startEventListeners();
