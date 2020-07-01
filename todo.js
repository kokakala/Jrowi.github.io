const toDoForm = document.querySelector('.js-toDoForm'),
      toDoInput = toDoForm.querySelector('input'),
      toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';


let toDos = [];

function handleCheck(event) {
  const input_checkbox = event.target;
  const labelText = input_checkbox.nextSibling 

  // If input has a "checked" attribute
  if (input_checkbox.checked === true) {
    // display strikethrough
    labelText.className = "line-through";
  } else {
    // Remove 'checked' & strikethrough
    input_checkbox.removeAttribute('checked');
    labelText.className = '';
  }
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== JSON.parse(li.id);
  });

  toDos = cleanToDos

  // Save the updated data in LS
  saveToDos();
};

// Save to do list in local storage
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
};


function paintToDo(text) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  // const span = document.createElement('span');
  const newId = toDos.length + 1; // =>  0 + 1
  
  delBtn.innerText = "❌";
  delBtn.className = "delBtn"
  delBtn.addEventListener('click', deleteToDo);
  // span.innerText = text;

  // Add input & label to add a check box
  const input = document.createElement('input');
  const label = document.createElement('label');
  input.type = "checkbox"
  input.id = text;
  input.name = text; 
  label.setAttribute("for", text);
  label.innerText = text; 
  input.addEventListener('click', handleCheck);
  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(delBtn);
  // li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text,
    id: newId
  }

  toDos.push(toDoObj);

  // Save data in LS
  saveToDos();
};

// Add a submit event
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  // Make the input box as empty
  toDoInput.value = "";
}

// Load To Do list
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  } 
};

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();