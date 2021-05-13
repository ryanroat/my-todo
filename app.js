/* eslint-disable linebreak-style */
// DOM constants
newTodo = document.querySelector('#newTodo'); // new task input field
newTodoBtn = document.querySelector('#newTodoBtn'); // new task submit button
taskItems = document.querySelector('.task-items'); // <ul> where tasks are displayed

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
    const newLI = document.createElement('li');
    newLI.className = 'row';
    newLI.innerHTML = `
    <div class="six columns">${newTask}</div>
          <div class="one columns">
            <a href="#" class="edit">Edit</a>
          </div>
          <div class="one columns">
            <a href="#" class="delete">Delete</a>
          </div>
    `;
    taskItems.appendChild(newLI);
    // clear input
    newTodo.value = '';
  }
}

startEventListeners();
