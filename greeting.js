const form = document.querySelector('.js-form'),
      input = form.querySelector('input'),
      greeting = document.querySelector('.js-greetings'),
      editBtn = document.querySelector('.fa-edit');

const clock = document.querySelector('.js-clock h1');

const USER_LS = "currentUser",
      SHOWING_CN = "showing";

// Save a name in local storage
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

// Handle a submit event
function enterName(event) {
  event.preventDefault();

  // Get the input value
  const currentValue = input.value;

  // Display the greeting
  paintGreeting(currentValue);

  // Save a name in LS
  saveName(currentValue);
}

// Create a method to display an element or not
function toDisplay(element, boolean) {
  if (boolean) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

function askForName() {

  // Hide the edit button
  toDisplay(editBtn, false)

  greeting.classList.remove(SHOWING_CN);

  form.classList.add(SHOWING_CN);
  form.addEventListener('submit', enterName);
}

function editName(event) {
  event.preventDefault();

  // Remove the current user from local storage
  localStorage.removeItem(USER_LS);

  // Reload the loadname function
  loadName();
}

function paintGreeting(text) {

  // Display the edit button
  toDisplay(editBtn, true);

  // Hide form
  form.classList.remove(SHOWING_CN);
  // Display greeting
  greeting.classList.add(SHOWING_CN);

  const clockArr = clock.textContent.split(":");
  const hour = parseInt(clockArr[0], 10);

  if (hour >= 5 && hour < 12) {
    greeting.innerText = `Good morning, ${text}!`;
  } else if (hour >= 12 && hour < 18) {
    greeting.innerText = `Good afternoon, ${text}!`;
  } else if (hour >= 18 && hour < 23) {
    greeting.innerText = `Good evening, ${text}!`;
  } else {
    greeting.innerText = `Howdy, ${text}!`;
  }

   editBtn.addEventListener('click', editName);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);

  // if(currentUser  === null ) {
  if(!currentUser) {
    // There is no name
    askForName();

  } else {
    // There is a name
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();