let todoItems = [];

//função adiciona Tarefas
function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  }

  todoItems.push(todo);
  console.log(todoItems);

  //Referenciando ul no html
  const list = document.querySelector('.js-todo-list');
  list.insertAdjacentHTML('beforeend', `
    <li class="todo-item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox" />
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
        <svg>
          <use href="#delete-icon"></use>
        </svg>
      </button>
    </li>
  ` );
}

//verifica evento do formulário e valor input
const form = document.querySelector('.js-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('.js-todo-input');

  let text = input.value.trim();
  if(text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

function checkTodo(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;

  const item = document.querySelector(`[data-key="${key}"]`);
  if(todoItems[index].checked) {
    item.classList.add('done');
  } else {
    item.classList.remove('done');
  }
}

// verifica click e item da lista para check
const list = document.querySelector('.js-todo-list');
list.addEventListener('click', (event) => {
  if(event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    checkTodo(itemKey);
  }
  
  if(event.target.classList.contains('js-delete-todo')) {
    const item = document.getElementsByClassName('js-todo-list');
	const itemKey = event.target.parentElement.dataset.key;
	console.log(itemKey);
	document.querySelector(`[data-key="${itemKey}"]`).innerHTML = "";
  }
});
