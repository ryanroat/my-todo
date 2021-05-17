/* eslint-disable linebreak-style */

// app constats
let tasks = [];

// DOM constants
const newTodo = document.querySelector('#newTodo'); // new task input field
const newTodoBtn = document.querySelector('#newTodoBtn'); // new task submit buttonconst
const taskItems = document.querySelector('.task-items'); // <ul> where tasks are displayed
// const darkmodeBtn = document.querySelector('#darkmodeBtn');
const LS = window.localStorage; // shortcut to localstorage API

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

// event listeners
function startEventListeners() {
  document.addEventListener('DOMContentLoaded', loadStoredTasks);
  newTodoBtn.addEventListener('click', newBtnClick);
  taskItems.addEventListener('click', taskOptions);
  // darkmodeBtn.addEventListener('click', () => {
  // });
}

// insert a task into DOM
function displayTask(task) {
  // create and populate new <li> element
  const newLI = document.createElement('li');
  newLI.className = 'row';
  newLI.innerHTML = `
  <div class="seven columns">${task.task}</div>
        <div class="two columns">
          <button class="edit">Edit</button>
        </div>
        <div class="one columns">
          <button class="delete data-ID=${task.taskID}">Delete</button>
        </div>
  `;
  // append new <li> element to DOM task list
  taskItems.appendChild(newLI);
  // clear new task input and set focus to same
  newTodo.value = '';
  newTodo.focus();
}

function newBtnClick() {
  newTask = newTodo.value;
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
    // append new task obj to tasks array
    tasks.push(newTaskObj);
    // store tasks array to local storage
    LS.setItem('tdtrack', JSON.stringify(tasks));
    // display new task
    displayTask(newTaskObj);
  }
}

// edit and delete tasks
function taskOptions(event) {
  console.log(event.target);
  // check and run if delete was clicked
  if (event.target.classList.contains('delete')) {
    // get task ID from DOM delete button element
    const deleteID = event.target.classList[1].split('=')[1];
    // find and remove task from array matching task ID
    tasks.forEach((task, index) => {
      if (task.taskID == deleteID) {
        tasks.splice(index, 1);
      }
    });
    // store tasks array to local storage
    LS.setItem('tdtrack', JSON.stringify(tasks));
    // remove selected task element from DOM
    event.target.parentElement.parentElement.remove();
  }

  if (event.target.classList.contains('edit')) {
    console.log('edit clicked');
    newTodo.value = event.target.parentElement.previousElementSibling.innerText;
    event.target.parentElement.parentElement.remove();
    newTodo.focus();
  }
  event.preventDefault();
}

startEventListeners();
