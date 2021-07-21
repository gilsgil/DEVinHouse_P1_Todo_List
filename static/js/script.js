/* Informações 

1 - Usuário digita uma tarefa no input (este input tem um maxlength de 30 caracteres sem rejeições)
2 - O usuário pode clicar no botão adicionar ou pressionar a tecla 'Enter' para adicionar tarefas (Listeners fazem o tratamentos destes eventos)
3 - A função 'addTask()' cria todos elementos e atributos que populam a Div 'todo-div'
4 - Existe um contador que adicionar um ID e um NAME para os elementos, afim de fazer uma validação ao clicar no botão "X", através da função 'removeTask()'
5 - Ao clicar no botão "X" uma mensagem de confirmação é apresentada
6 - Para salvar as alterações no localStorage, realizo o salvamento do "innerHTML" da Div 'todo-div' a cada interação com os elementos

*/


// Contador de IDs das rows e NAMEs dos elementos
var contador = 0

// Seletores dos elementos
var inputTask = document.getElementById('input') // Seleciona o input de tarefas
var tasksDiv = document.getElementById('todo-div') // Seleciona a DIV de tarefas
var buttonAddTask = document.getElementById('btn-adicionar') // Seleciona o botão "Adicionar"
var excludeButton = document.getElementById('exclude-btn') // Seleciona o botão "X" na DIV de tarefas
var selectCheckbox = document.querySelector('input[type="checkbox"') // Seleciona o checkbox
var selectTask = document.querySelector('span') // seleciona uma tarefa

// Listener do botão "Adicionar"
buttonAddTask.addEventListener('click', function (e) {
    if (inputTask.value) { // valida se o campo está preenchido
        addTask()
        saveStorage()
    }

    inputTask.value = '' // Limpa o campo após inserir uma tarefa
})


// Listener do input ao apertar a tecla "Enter"
inputTask.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        if (inputTask.value) { // valida se o campo está preenchido
            addTask()
            saveStorage()
        }

        inputTask.value = '' // Limpa o campo após inserir uma tarefa
    }
})

// ADICIONA UMA TAREFA
function addTask() {
    // Varíavel que recebe o texto do input
    texto = document.getElementById('input').value
    // Divs
    var rowDiv = document.createElement('div')
    tasksDiv.appendChild(rowDiv)
    var checkboxDiv = document.createElement('div')
    var taskDiv = document.createElement('div')
    var excludeDiv = document.createElement('div')
    // Atributos
    rowDiv.setAttribute('class', 'row container-fluid')
    rowDiv.setAttribute('id', contador)
    checkboxDiv.setAttribute('class', 'col-1')
    taskDiv.setAttribute('class', 'col-10')
    taskDiv.setAttribute('name', 'task' + contador)
    excludeDiv.setAttribute('class', 'col-1')
    // Elements
    var inputElement = document.createElement('input')
    var taskElement = document.createTextNode(inputTask.value)
    var excludeElement = document.createElement('button')
    var excludeButtonValue = document.createTextNode("X")
    // Atributos dos elementos
    inputElement.setAttribute('type', 'checkbox')
    inputElement.setAttribute('name', contador)
    inputElement.setAttribute('onchange', 'toggleCompleted(this)')
    excludeElement.setAttribute('class', 'btn btn-sm')
    excludeElement.setAttribute('onclick', 'removeTask(this)')
    excludeElement.setAttribute('name', contador)

    // Adiciona os elementos
    rowDiv.appendChild(checkboxDiv)
    rowDiv.appendChild(taskDiv)
    rowDiv.appendChild(excludeDiv)
    checkboxDiv.appendChild(inputElement)
    excludeDiv.appendChild(excludeElement)
    taskDiv.appendChild(taskElement)
    excludeElement.appendChild(excludeButtonValue)
    contador++
}

// Remove uma tarefa
function removeTask(e) {
    element = document.getElementById(e.name)
    if (confirm('Tem certeza que deseja excluir este item?')) {
        if (element.id === e.name) {
            element.remove()
            saveStorage()
        }
    }

}

// Adiciona tarefa como concluída
function toggleCompleted(e) {
    if (e.checked) {
        element = document.querySelector("[name='task" + CSS.escape(e.name) + "']")
        if (element) {
            // risca o texto
            element.style.cssText = 'text-decoration: line-through;'
            e.setAttribute('checked', 'true')
            saveStorage()
        }
    } else {
        element = document.querySelector("[name='task" + CSS.escape(e.name) + "']")
        if (element) {
            // retira o risco do texto
            element.style.cssText = 'text-decoration: normal;'
            e.removeAttribute('checked')
            saveStorage()
        }
    }

}

// Carrega o LocalStorage
if (localStorage.getItem("tasks")) {
    loaded = localStorage.getItem("tasks")
    document.getElementById('todo-div').innerHTML = loaded
}

// Grava as tarefas no LocalStorage
function saveStorage() {
    stored = document.getElementById('todo-div').innerHTML
    localStorage.setItem("tasks", stored)
}

// Maxlength do Input (JQuery)
$("input").attr("maxlength", 30)

