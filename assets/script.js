const localStorageKey = 'to-do-list'

const newTask = () => {
    let input = document.getElementById('input-new-text')
    if (!input.value){
        alert("Digite algo para inserir na sua lista!")
    } else if (validateNewText()) {
        alert('Já existe uma tarefa com este nome.')
    } else {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
        values.push({
            name: [(input.value), false]
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

const validateNewText = () => {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    let inputValue = document.getElementById('input-new-text').value
    console.log(inputValue)
    let existe = values.find(x => x.name[0] == (inputValue))
    return !existe ? false : true
}


const showValues = () => {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++){
        list.innerHTML += `<div class="task ${values[i]["checked"] ? "checked": ""}">
            <p>${values[i]["name"][0]}</p>
            <div>
            <button onclick='checkItem("${values[i]["name"]}")'><img src="assets/src/img/task.svg" alt="check"></button>
            <button onclick='removeItem("${values[i]["name"]}")'><img src="assets/src/img/trash.svg" alt="delete"></button>
            </div>
        </div>`
    }
}

const checkItem = (data) => {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    let index = values.findIndex(x => x.name == data)
    values.splice(index, 1, {name: values[index]["name"], checked: !values[index]["checked"]})
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
}

const removeItem = (data) => {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    let index = values.findIndex(x => x.name == data)
    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
}

showValues()