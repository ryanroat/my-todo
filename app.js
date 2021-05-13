/* eslint-disable linebreak-style */
// DOM constants
newTodo = document.querySelector('#newTodo');
newTodoBtn = document.querySelector('#newTodoBtn');

// event listeners
function startEventListeners() {
  newTodoBtn.addEventListener('click', newBtnClick);
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
    // display new task
    // clear input
    newTodo.value = '';
  }
}

startEventListeners();
