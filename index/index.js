// function list to do and save to local storage
function displayTodo() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    let list = ''

    if (todos) {
        todos.forEach(todo => {
            list += `
                <ul class="list-group list-group-horizontal rounded-0 bg-transparent m-2">
                    <li class="list-group-item">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="${todo.id}" onChange="setComplete(this.checked, this.id)" aria-label="..." ${todo.checked? 'checked' : ''}>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <p class="lead">${todo.name}</p>
                    </li>
                    <li class="list-group-item">
                        <button type="button" class="btn btn-danger" id=${todo.id} onclick="deleteTodo(this.id)">Delete</button>
                    </li>
                </ul>
            `
        })
    }
    document.getElementById('list-todo').innerHTML = list;
}

function submitTodo() {
    const todo = document.getElementById('add-todo').value;

    let todos = JSON.parse(localStorage.getItem('todos'));

    if (todos) {
        todos.push({
            id: todos[todos.length - 1].id + 1,
            name: todo,
            checked: false
        });
    } else {
        todos = [{
            id: 0,
            name: todo,
            checked: false
        }];
    }

    localStorage.setItem('todos', JSON.stringify(todos));

    document.getElementById('add-todo').value = '';

    displayTodo();
}

function setComplete(checked, id) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    
    todos = todos.map(el => {
        if (el.id == Number(id)) {
            el.checked = checked;
        }
        return el;
    });

    localStorage.setItem('todos', JSON.stringify(todos));

    displayTodo();
}

function deleteTodo(id) {
    let todos = JSON.parse(localStorage.getItem('todos'));

    todos = todos.filter(el => el.id !== Number(id));

    if (todos.length === todos.length) {
        localStorage.setItem('todos', JSON.stringify(todos));
    } else {
        localStorage.removeItem('todos');
    }

    displayTodo();
}