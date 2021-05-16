/* eslint-disable linebreak-style */

// app constats
const tasks = [];

// DOM constants
const newTodo = document.querySelector('#newTodo'); // new task input field
const newTodoBtn = document.querySelector('#newTodoBtn'); // new task submit buttonconst
const taskItems = document.querySelector('.task-items'); // <ul> where tasks are displayed
// const darkmodeBtn = document.querySelector('#darkmodeBtn');
const LS = window.localStorage;

// event listeners
function startEventListeners() {
  newTodoBtn.addEventListener('click', newBtnClick);
  taskItems.addEventListener('click', taskOptions);
  // darkmodeBtn.addEventListener('click', () => {
  //   console.log('darkmode clicked');
  // });
}

// insert a task into DOM
function displayTask(task) {
  const newLI = document.createElement('li');
  newLI.className = 'row';
  newLI.innerHTML = `
  <div class="seven columns">${newTask}</div>
        <div class="two columns">
          <button class="edit">Edit</button>
        </div>
        <div class="one columns">
          <button class="delete">Delete</button>
        </div>
  `;
  taskItems.appendChild(newLI);
  // clear input
  newTodo.value = '';
  newTodo.focus();
}

function newBtnClick() {
  console.log('button clicked');
  newTask = newTodo.value;
  if (newTask === '') {
    // message please enter a task
  }
  if (newTask !== '') {
    console.log(newTask);
    // store new task
    // local storage key is tdtrack - value will be json string of array of tasks
    tasks.push({ task: newTask });
    LS.setItem('tdtrack', JSON.stringify(tasks));
    console.log(tasks);
    // display new task
    displayTask(newTask);
  }
}

function taskOptions(event) {
  console.log(event.target);
  if (event.target.classList.contains('delete')) {
    console.log('delete clicked');
    event.target.parentElement.parentElement.remove();
  }
  if (event.target.classList.contains('edit')) {
    console.log('edit clicked');
    console.log(event.target.parentElement.previousElementSibling.innerText);
    newTodo.value = event.target.parentElement.previousElementSibling.innerText;
    event.target.parentElement.parentElement.remove();
    newTodo.focus();
  }
  event.preventDefault();
}

startEventListeners();
