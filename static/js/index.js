let addButton = document.getElementById("addbutton")
let addModal = document.getElementById("addmodal")
let addModalClose = document.getElementById("addmodalclose")
let addForm = document.getElementById("addform")
let modalButton = document.getElementById("modalbutton")
let modalHeader = document.getElementById("modalheader")
let deleteElement = document.getElementById("delete")
let addOrUpdateElement = document.getElementById("addorupdate")
let deleteMessageElement = document.getElementById("deletemessage")
let deleteFormElement = document.getElementById("deleteform")
let modalElement = document.getElementById("modal")

addButton.addEventListener("click", openAddModal)
addModalClose.addEventListener("click", closeAddModal)
function openAddModal(event)
{
    deleteElement.classList.add("hidden")
    modalElement.classList.add("h-[500px]")
    addOrUpdateElement.classList.remove("hidden")
    addForm.action = "/add"
    modalHeader.textContent = "Add Employee"
    modalButton.textContent = "add"
    toggleAddModal()
}

function closeAddModal(event)
{
    clearValues()
    toggleAddModal()
}

function toggleAddModal()
{
    addModal.classList.toggle("invisible")
    addModal.classList.toggle("visible")
}

function clearValues() 
{
    for (let i = 0; i < addForm.children.length; i++)
    {
        addForm.children[i].lastElementChild.value = ""
    }
}

function deleteEmployee(id, name)
{
    deleteElement.classList.remove("hidden")
    modalElement.classList.remove("h-[500px]")
    addOrUpdateElement.classList.add("hidden")
    modalHeader.textContent = "Delete Employee"
    deleteMessageElement.innerHTML = `Are you sure you want to delete <strong>${name}</strong> employee`
    deleteFormElement.action = `/delete/${id}`
    toggleAddModal()
}

function editEmployee(id, name, email, phone)
{
    for (let i = 0; i < addForm.children.length; i++)
    {
        if (addForm.children[i].lastElementChild.id == "name")
        {
            addForm.children[i].lastElementChild.value = name
            continue
        }

        if (addForm.children[i].lastElementChild.id == "email")
        {
            addForm.children[i].lastElementChild.value = email
            continue
        }

        if (addForm.children[i].lastElementChild.id == "phone")
        {
            addForm.children[i].lastElementChild.value = phone
            continue
        }
    }
    deleteElement.classList.add("hidden")
    modalElement.classList.add("h-[500px]")
    addOrUpdateElement.classList.remove("hidden")
    addForm.action = `/update/${id}`
    modalHeader.textContent = "Update Employee"
    modalButton.textContent = "Update"
    toggleAddModal()
}