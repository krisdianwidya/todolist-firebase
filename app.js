let todoList = ''
const listContainer = document.querySelector('.todo-list');

db.collection('todos').orderBy('title').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(({ type, doc }) => {
        if (type === 'added') {
            todoList += listUI(doc.data(), doc.id);
            listContainer.innerHTML = todoList;
        } else if (type === 'removed') {
            let li = document.querySelector(`[data-id=${doc.id}]`);
            li.remove();
        } else if (type === 'modified') {
            let li = document.querySelector(`[data-id=${doc.id}]`);
            li.querySelector('span').textContent = doc.data().title;
        }
    });

});

function listUI(list, id) {
    return `
    <li class="list-group-item d-flex justify-content-between" data-id="${id}">
    <span>${list.title}</span>
        <div>
            <a class="modal-update" data-toggle="modal" data-target="#modalEdit">
                <i class="fas fa-edit"></i>
            </a>
            <a class="btn-del">
                <i class="fas fa-trash-alt"></i>
            </a>
        </div>
    </li>
    `
}

const inputTodo = document.querySelector('#todo-input');
const btnAdd = document.querySelector('#button-add');

btnAdd.addEventListener('click', () => {
    db.collection('todos').add({
        title: inputTodo.value
    });
    inputTodo.value = '';
});

// event binding
document.addEventListener('click', function (e) {
    if (e.target.parentElement.classList.contains('btn-del')) {
        const todoId = e.target.parentElement.parentElement.parentElement.dataset.id;
        db.collection('todos').doc(todoId).delete();
    }
});

document.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('modal-update')) {
        const todoId = e.target.parentElement.parentElement.parentElement.dataset.id;

        const inputUpdate = document.querySelector('#input-update');
        const btnUpdate = document.querySelector('#btn-update');

        inputUpdate.value = e.target.parentElement.parentElement.parentElement.textContent.trim();

        btnUpdate.addEventListener('click', () => {
            if (inputUpdate !== '') {
                db.collection('todos').doc(todoId).update({
                    title: inputUpdate.value
                });
            }
        });
    }
});