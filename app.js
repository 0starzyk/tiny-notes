const notesContainer = document.querySelector('.notes-container');
const plusButton = document.querySelector('.plus');
const deleteButton = document.querySelector('.delete');
const showButton = document.querySelector('.show');
const title = document.querySelector('.title');
const editButtons = document.querySelectorAll('.edit');
let removeButtons = document.querySelectorAll('.remove');
const text = document.querySelector('.text');

function adding()
{
    const titleSubmit = title.value !== "" ? title.value : "New note";
    const textSubmit = text.value !== "" ? text.value : "Empty";
    const note = document.createElement('div');
    note.innerHTML = `
    <div class="note-container">
        <div class="note">
            <div class="note-title bold">
                <div>${titleSubmit}</div>
                <div>
                    <button class="edit">
                        <i class="fa-solid fa-pen-fancy"></i>
                    </button>
                    <button class="remove">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>                    
            </div>
            <div class="note-content">${textSubmit}</div>
        </div>
    </div>`;
    notesContainer.appendChild(note);
    title.value = '';
    text.value = '';
}

function removeNote(event)
{
    if (event.target.parentElement.matches('.remove'))
    {
        event.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    }
}

document.addEventListener('click', function change(event) {
    console.log(event.target);
    if (event.target.parentElement.matches('.edit'))
    {
        const targetNote = event.target.parentElement.parentElement.parentElement.parentElement;
        const takenTitle = targetNote.children[0].children[0].innerText;
        const takenText = targetNote.children[1].innerText;
        removeButtons = document.querySelectorAll('.remove');

        title.value = takenTitle;
        text.value = takenText;
        plusButton.children[0].classList.remove('fa-circle-plus');
        plusButton.children[0].classList.add('fa-pen-fancy');

        plusButton.removeEventListener('click', adding);
        document.removeEventListener('click', removeNote);
        document.removeEventListener('click', change);
        plusButton.addEventListener('click', function editing() {
            targetNote.children[0].children[0].innerText = title.value;
            targetNote.children[1].innerText = text.value;
            plusButton.children[0].classList.remove('fa-pen-fancy');
            plusButton.children[0].classList.add('fa-circle-plus');
            plusButton.removeEventListener('click', editing);
            plusButton.addEventListener('click', adding);
            title.value = '';
            text.value = '';
            document.addEventListener('click', removeNote);
            document.addEventListener('click', change);
        });
    }
});

document.addEventListener('click', removeNote);

plusButton.addEventListener('click', adding);

deleteButton.addEventListener('click', () => {
    title.value = '';
    text.value = '';
});

showButton.addEventListener('click', () => {
    notesContainer.classList.toggle('expand');
});
