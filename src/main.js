"use strict";
//datepicker
flatpickr('#datepicker', {
    dateFormat: 'Y-m-d',

});

const addButton = document.getElementById("add_btn")
const taskTitle = document.getElementById("task_input")
const tbody = document.getElementById("table_body")



function createTableRow(item) {
    const tableRow = document.createElement('tr')
    tableRow.classList.add("p-4", "text-center")
    const titleTd = document.createElement('td')
    //text of title
    titleTd.innerText = item.title
    titleTd.classList.add("text-left", "pb-5")
    const priorityTd = document.createElement('td')
    priorityTd.classList.add("pb-5")
    const prioritySpan = document.createElement('span')
    prioritySpan.classList.add("px-3", "py-1", "rounded-2xl")
    //color of priority
    prioritySpan.classList.add(`${item.priorityColor}`)
    //text of priority
    prioritySpan.innerText = `${item.priority}`
    priorityTd.append(prioritySpan)
    const statusTd = document.createElement('td')
    statusTd.classList.add("pb-5")
    const statusSpan = document.createElement("span")
    statusSpan.classList.add('px-3', 'py-1', 'rounded-2xl')
    //color of status
    statusSpan.classList.add(`${item.statusColor}`)
    //text of status
    statusSpan.innerText = `${item.status}`
    statusTd.append(statusSpan)
    const deadlineTd = document.createElement('td')
    deadlineTd.classList.add("pb-5")
    const deadlineSpan = document.createElement('span')
    //text of deadline
    deadlineSpan.innerText = item.deadline
    deadlineSpan.classList.add("border", "rounded-2xl", "px-2", 'py-1', "border-blue-500")
    deadlineTd.append(deadlineSpan)
    const actionTd = document.createElement("td")
    actionTd.classList.add('flex', 'gap-3', 'justify-center', 'pb-5')
    //delete icon
    const deleteIcon = document.createElement('img')
    deleteIcon.src = "./assets/svg/trash-solid.svg"
    deleteIcon.classList.add('w-4', 'cursor-pointer')
    //edit icon
    const editIcon = document.createElement('img')
    editIcon.src = "./assets/svg/edit-solid.svg"
    editIcon.classList.add('w-4', 'cursor-pointer')
    //eye icon
    const eyeIcon = document.createElement('img')
    eyeIcon.src = './assets/svg/eye-solid.svg'
    eyeIcon.classList.add('w-4', 'cursor-pointer')

    actionTd.append(eyeIcon, editIcon, deleteIcon)


    tableRow.append(titleTd, priorityTd, statusTd, deadlineTd, actionTd)
    tbody.append(tableRow)


}

