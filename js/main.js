//! POST добавляет новый обьект

// fetch(API, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json; charset=utf-8",
//   },
//   body: JSON.stringify({ age: 1234 }),
// })
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });
//! Добавляет новый ключ (Редактирует) в обьекте выброчно по id (PATCH)

// fetch(`${API}/${1}`, {
//   method: "PATCH",
//   headers: {
//     "Content-Type": "application/json; charset=utf-8",
//   },
//   body: JSON.stringify({ age: 4321 }),
// });
//! Меняет целый обьект PUT

// fetch(`${API}/${1}`, {
//   method: "PUT",
//   headers: {
//     "Content-Type": "application/json; charset=utf-8",
//   body: JSON.stringify({ age: 12345 }),
//   },
// });

// ! Метод для удаления обьекта

// fetch(`${API}/${3}`, {
//   method: "DELETE",
// });

const API = "http://localhost:8000/products";

// ! ============= CREATE ================

let btn = document.querySelector(".btn");
let inp = document.querySelector(".task");
let inp1 = document.querySelector(".task1");
let inp2 = document.querySelector(".task2");
let inp3 = document.querySelector(".task3");
let list = document.querySelector(".task-list");

btn.addEventListener("click", () => {
  if (!inp.value.trim()) {
    alert("Заполните поле");
    return;
  }
  let newObj = {
    task: inp.value,
    task1: inp1.value,
    task2: inp2.value,
    task3: inp3.value,
  };
  createTask(newObj);
  readTask();
  inp.value = "";
  inp1.value = "";
  inp2.value = "";
  inp3.value = "";
});

function createTask(task,task1,task2,task3) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(task,task1,task2,task3),
  }).then((res) => readTask());
}
// ! ================= READ ================= 
function readTask() {
  fetch(API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      list.innerHTML = "";
      data.forEach((elem) => {
        list.innerHTML += `
        <div class = "book">
        <img style="width: 150px; height: 250px;" src="${elem.task}" alt="" />
        <h5 class = "book1">${elem.task1}</h5>
        <h5 class = "book1">${elem.task2}</h5>
        <h5 class = "book1">${elem.task3}</h5>
        <button id=${elem.id} class="btnDelete">delete</button>
        <button id=${elem.id} class="btnEdit">ebdit</button>
        </div>
        `;
      });
    });
}
readTask();

// ! ================ DELETE =================

document.addEventListener("click", (e) => {
  let del_class = [...e.target.classList];
  if (del_class.includes("btnDelete")) {
    const del_id = e.target.id;
    fetch(`${API}/${del_id}`, {
      method: "DELETE",
    }).then(() => readTask());
  }
});

// ! ================ EDIT =================

let inpEdit = document.querySelector(".inpEdit");
let inpEdit1 = document.querySelector(".inpEdit1");
let inpEdit2 = document.querySelector(".inpEdit2");
let inpEdit3 = document.querySelector(".inpEdit3");
let btnEditSave = document.querySelector(".saveEdit");
let editModal = document.querySelector(".editModal");

document.addEventListener("click", (e) => {
  let edit_class = [...e.target.classList];
  if (edit_class.includes("btnEdit","btnEdit1","btnEdit2","btnEdit3")) {
    editModal.style.display = "block";
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        inpEdit.value = data.task;
        inpEdit1.value = data.task1;
        inpEdit2.value = data.task2;
        inpEdit3.value = data.task3;
        btnEditSave.setAttribute("id", data.id);
      });
  }
});

btnEditSave.addEventListener("click", () => {
  let editTask = {
    task: inpEdit.value,
    task1: inpEdit1.value,
    task2: inpEdit2.value,
    task3: inpEdit3.value,
  };
  editedTask(editTask, btnEditSave.id);
  editModal.style.display = "none";
});

function editedTask(editTask, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(editTask),
  }).then(() => readTask());
}
