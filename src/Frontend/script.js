document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list');
  const todoText = document.getElementById('todo-text');
  const addButton = document.getElementById('add-button');
  const updateButton = document.getElementById('update-button');
  const statusSpan = document.getElementById('status');

  const apiUrl = 'http://localhost:8080/api/todos';

  let selectedTodoId = null;

  // Function to fetch and display todos
  async function fetchTodos() {
    todoList.innerHTML = ''; // Clear the list
    const response = await fetch(apiUrl);
    const data = await response.json();

    data.todos.forEach((todo) => {
      const todoItem = document.createElement('div');
      todoItem.className = 'todo-item';
      todoItem.innerHTML = `
                <span>${todo.text}</span>
                <button class="delete-button" data-id="${todo.id}">Delete</button>
                <button class="update-button" data-id="${todo.id}">Update</button>
            `;
      todoList.appendChild(todoItem);
    });
  }

  // Initial fetch of todos
  fetchTodos();

  // Add a new todo
  addButton.addEventListener('click', async () => {
    const text = todoText.value;
    const isCompleted = document.getElementById('isCompleted').checked;

    if (text) {
      if (selectedTodoId === null) {
        // Create a new todo
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, isCompleted }),
        });
        if (response.status === 201) {
          todoText.value = '';
          document.getElementById('isCompleted').checked = false;
          fetchTodos();
        }
      } else {
        // Update the existing todo if a todo is selected
        const response = await fetch(`${apiUrl}/${selectedTodoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, isCompleted }),
        });
        if (response.status === 200) {
          todoText.value = '';
          document.getElementById('isCompleted').checked = false;
          selectedTodoId = null;
          updateButton.style.display = 'none';
          addButton.innerText = 'Add';
          fetchTodos();
        }
      }
    }
  });

  // Update a todo
  todoList.addEventListener('click', (e) => {
    if (e.target.className === 'update-button') {
      const id = e.target.getAttribute('data-id');
      selectedTodoId = id;
      updateButton.style.display = 'block';
      addButton.innerText = 'Cancel';
      const todoItem = data.todos.find((todo) => todo.id === parseInt(id));
      todoText.value = todoItem.text;
      document.getElementById('isCompleted').checked = todoItem.isCompleted;
    }
  });

  // Handle "Update" button click
  updateButton.addEventListener('click', async () => {
    const text = todoText.value;
    const isCompleted = document.getElementById('isCompleted').checked;

    if (text && selectedTodoId !== null) {
      const response = await fetch(`${apiUrl}/${selectedTodoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, isCompleted }),
      });
      if (response.status === 200) {
        todoText.value = '';
        document.getElementById('isCompleted').checked = false;
        selectedTodoId = null;
        updateButton.style.display = 'none';
        addButton.innerText = 'Add';
        fetchTodos();
      }
    }
  });

  // Delete a todo
  todoList.addEventListener('click', async (e) => {
    if (e.target.className === 'delete-button') {
      const id = e.target.getAttribute('data-id');
      const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      if (response.status === 204) {
        selectedTodoId = null;
        updateButton.style.display = 'none';
        addButton.innerText = 'Add';
        fetchTodos();
      }
    }
  });

  // Function to display the "isCompleted" status in the UI
  function displayStatus(isCompleted) {
    statusSpan.textContent = isCompleted ? 'Completed' : 'Not Completed';
  }
});
