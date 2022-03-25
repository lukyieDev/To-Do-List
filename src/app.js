const inputTask = document.querySelector('#create-task');
const buttonCreateTask = document.querySelector('#create-task-button');
const tasks_container = document.querySelector('.tasks');

function addTask() {
    const tasks = getTasks();

    tasks.push({
        title: inputTask.value,
        done: false
    })

    setTasks(tasks)

    if (inputTask.value == '' ) {
        deleteTaskByTitle(inputTask.value)
        alert("esta vazio, macaco")
        console.log(inputTask.value)
        
    } else {
        createTask(inputTask.value)
    }


    inputTask.value = '';
}



function getTasks() {
    return localStorage.getItem('tasks') != null ? JSON.parse(localStorage.getItem('tasks')) : []
}

function deleteAllTasks() {
    JSON.parse(localStorage.getItem('tasks')).length > 0
        ? setTasks([])
        : alert('Sem Tarefas Para Excluir')

    renderTasks()
}

function setTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function deleteTaskByTitle(title) {
    let tasks = Array.from(getTasks())

    tasks = tasks.filter(task => task.title != title);

    setTasks(tasks)
}

function createTask(title) {

    const taskContent = document.createElement('div')
    taskContent.setAttribute('index', title)
    taskContent.style.margin = "10px"

    const taskTitle = document.createElement('span');
    const deleteButton = document.createElement('button');

   
    taskTitle.textContent = title
    taskTitle.classList.add('task')
    taskTitle.setAttribute('index', title)

    deleteButton.innerText = 'x'
    deleteButton.setAttribute('index', title)

    deleteButton.addEventListener('click', (e) => {
        const index = e.target.getAttribute('index')
        document.querySelector(`div[index="${index}"]`).remove()
        deleteTaskByTitle(index)
    })

    taskTitle.addEventListener('click', (e) => {
        e.target.classList.toggle('done')
    })

    taskContent.appendChild(taskTitle)
    taskContent.appendChild(deleteButton)

    tasks_container.appendChild(taskContent)
}

function renderTasks() {
    const tasks = getTasks()

    tasks_container.innerHTML = '';

    tasks.forEach(task => {
        createTask(task.title);
    });
}


renderTasks()