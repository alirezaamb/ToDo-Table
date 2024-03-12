'use strict';
//datepicker
flatpickr('#datepicker', {
  dateFormat: 'Y-m-d',
});

const addButton = document.getElementById('add_btn');
const tbody = document.getElementById('table_body');
const modalOverlay = document.getElementById('modal_overlay');
const modalBody = document.getElementById('modal_body');
const submitButton = document.getElementById('submit_button');
const taskTitle = document.getElementById('task_input');
const prioritySelect = document.getElementById('priority_select');
const statusSelect = document.getElementById('status_select');
const taskDeadline = document.getElementById('datepicker');

let todoItems = [];

let isEdit = {
  mode: false,
  id: null,
};

prioritySelect.addEventListener('change', changePriority);
statusSelect.addEventListener('change', changeStatus);
submitButton.addEventListener('click', submitHandler);
addButton.addEventListener('click', openModal);
modalOverlay.addEventListener('click', closeModal);

function changeStatus() {
  let statusColor = '';
  switch (statusSelect.value) {
    case 'ToDo':
      statusColor = 'bg-red-500';

      break;
    case 'Doing':
      statusColor = 'bg-yellow-500';

      break;
    case 'Done':
      statusColor = 'bg-green-500';

      break;
  }
  // console.log(statusColor, status)
  return statusColor;
}

function changePriority() {
  let priorityColor = '';
  switch (prioritySelect.value) {
    case 'Low':
      priorityColor = 'bg-red-500';
      break;
    case 'Medium':
      priorityColor = 'bg-yellow-500';
      break;
    case 'High':
      priorityColor = 'bg-green-500';
      break;
  }
  // console.log(prioritySelect.value)
  return priorityColor;
}

function submitHandler(event) {
  event.preventDefault();

  if (validateInputs()) {
    if (!isEdit.mode) {
      const todo = {
        title: taskTitle.value,
        deadline: taskDeadline.value,
        priority: prioritySelect.value,
        status: statusSelect.value,
        priorityColor: changePriority(),
        statusColor: changeStatus(),
        id: Date.now(),
      };
      todoItems.push(todo);
      renderData(todoItems);
    } else {
      editData(isEdit.id);
    }
    closeModal();
    clearInputs();
  }
}

function renderData(todoItems) {
  tbody.innerHTML = '';

  todoItems.forEach((item) => {
    createTableRow(item);
  });
}

function validateInputs() {
  if (taskTitle.value === '' || taskDeadline.value === '') {
    alert('Please enter the inputs');
    return false;
  }
  return true;
}

function clearInputs() {
  taskTitle.value = '';
  taskDeadline.value = '';
}

function closeModal() {
  modalOverlay.classList.add('hidden');
  modalBody.classList.add('hidden');
}

function openModal() {
  modalOverlay.classList.remove('hidden');
  modalBody.classList.remove('hidden');
}

function createTableRow(item) {
  const tableRow = document.createElement('tr');
  tableRow.setAttribute('id', item.id);
  tableRow.classList.add('p-4', 'text-center');
  const titleTd = document.createElement('td');
  //text of title
  titleTd.innerText = item.title;
  titleTd.classList.add('text-left', 'pb-5');
  const priorityTd = document.createElement('td');
  priorityTd.classList.add('pb-5');
  const prioritySpan = document.createElement('span');
  prioritySpan.classList.add('px-3', 'py-1', 'rounded-2xl');
  //color of priority
  prioritySpan.classList.add(`${item.priorityColor}`);
  //text of priority
  prioritySpan.innerText = `${item.priority}`;
  priorityTd.append(prioritySpan);
  const statusTd = document.createElement('td');
  statusTd.classList.add('pb-5');
  const statusSpan = document.createElement('span');
  statusSpan.classList.add('px-3', 'py-1', 'rounded-2xl');
  //color of status
  statusSpan.classList.add(`${item.statusColor}`);
  //text of status
  statusSpan.innerText = `${item.status}`;
  statusTd.append(statusSpan);
  const deadlineTd = document.createElement('td');
  deadlineTd.classList.add('pb-5');
  const deadlineSpan = document.createElement('span');
  //text of deadline
  deadlineSpan.innerText = item.deadline;
  deadlineSpan.classList.add(
    'border',
    'rounded-2xl',
    'px-2',
    'py-1',
    'border-blue-500'
  );
  deadlineTd.append(deadlineSpan);
  const actionTd = document.createElement('td');
  actionTd.classList.add('flex', 'gap-3', 'justify-center', 'pb-5');
  //delete icon
  const deleteIcon = document.createElement('img');
  deleteIcon.src = './assets/svg/trash-solid.svg';
  deleteIcon.classList.add('w-4', 'cursor-pointer');
  deleteIcon.setAttribute('id', item.id);
  //edit icon
  const editIcon = document.createElement('img');
  editIcon.src = './assets/svg/edit-solid.svg';
  editIcon.classList.add('w-4', 'cursor-pointer');
  editIcon.setAttribute('id', item.id);
  //eye icon
  const eyeIcon = document.createElement('img');
  eyeIcon.src = './assets/svg/eye-solid.svg';
  eyeIcon.classList.add('w-4', 'cursor-pointer');

  actionTd.append(deleteIcon, editIcon, eyeIcon);

  tableRow.append(titleTd, priorityTd, statusTd, deadlineTd, actionTd);
  tbody.append(tableRow);

  //delete icon
  deleteIcon.addEventListener('click', deleteHandler);
  // //edit icon
  editIcon.addEventListener('click', editHandler);
  // //eye icon
  // eyeIcon.addEventListener("click", viewHandler)
}

function deleteHandler(e) {
  // console.log(e.target.id)
  let id = e.target.id;
  todoItems = todoItems.filter((item) => item.id != id);
  renderData(todoItems);
}

function editHandler(e) {
  // console.log(e.target.id);
  const findItemForEdit = todoItems.find((item) => item.id == e.target.id);
  // console.log(findItemForEdit);
  taskTitle.value = findItemForEdit.title;
  taskDeadline.value = findItemForEdit.deadline;
  statusSelect.value = findItemForEdit.status;
  prioritySelect.value = findItemForEdit.priority;
  openModal();
  isEdit = {
    mode: true,
    id: findItemForEdit.id,
  };
}

function editData(id) {
  const findedTodo = todoItems.find((item) => item.id == id);
  console.log(findedTodo);

  findedTodo.deadline = taskDeadline.value;
  findedTodo.title = taskTitle.value;
  findedTodo.status = statusSelect.value;
  findedTodo.priority = prioritySelect.value;

  renderData(todoItems);
  isEdit = {
    mode: false,
    id: null,
  };
}
