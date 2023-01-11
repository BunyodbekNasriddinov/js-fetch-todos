const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-input");
const elList = document.querySelector(".js-list");
const localData = localStorage.getItem("token");

const renderTodo = (array, node) => {
  node.innerHTML = "";

  console.log(array);
  array.forEach((todo) => {
    node.innerHTML += `
    <li class="list-group-item d-flex align-items-center justify-content-between">
      <p>${todo.id}. ${todo.todo_value}</p>
      <div class="">
        <button class="btn btn-warning js-edit" data-todo-id="${todo.id}">EDIT</button>
        <button class="btn btn-danger js-delete" data-todo-id="${todo.id}">DELETE</button>
      </div>
    </li>
    `;
  });
};

const getTodos = async () => {
  const res = await fetch("http://localhost:5000/todo", {
    headers: {
      Authorization: localData,
    },
  });

  const data = await res.json();

  renderTodo(data, elList);
};

getTodos();

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  fetch("http://localhost:5000/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localData,
    },
    body: JSON.stringify({
      text: elInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) getTodos();
    })
    .catch((err) => console.log(err));

  elInput.value = "";
});

if (localData == "undefined" || localData == null) {
  location.replace("register.html");
}

function deleteTodo(id) {
  fetch(`http://localhost:5000/todo/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: localData,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) getTodos();
    })
    .catch((err) => console.log(err));
}

function editTodo(id, newTodo) {
  fetch(`http://localhost:5000/todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localData,
    },
    body: JSON.stringify({
      text: newTodo,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) getTodos();
    })
    .catch((err) => console.log(err));
}

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-delete")) {
    const id = evt.target.dataset.todoId;
    deleteTodo(id);
  }

  if (evt.target.matches(".js-edit")) {
    const id = evt.target.dataset.todoId;
    const newTodo = prompt("Todo'ni o'zgartiring...");
    console.log("edit");
    editTodo(id, newTodo);
  }
});
