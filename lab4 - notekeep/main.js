let notes = [];


const noteForm = document.querySelector('#note-form');
const noteTitle = document.querySelector('#note-title');
const noteContent = document.querySelector('#note-content');
const noteColor = document.querySelector('#note-color');
const notePin = document.querySelector('#note-pin');
const notesList = document.querySelector('#notes');
const date = new Date();
const formattedDate = date.toLocaleString('pl-PL', {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});
console.log(formattedDate);

//local storage
if (localStorage.getItem('notes')) {
    notes = JSON.parse(localStorage.getItem('notes'));
    displayNotes();
}


noteForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = noteTitle.value;
    const content = noteContent.value;
    const color = noteColor.value;
    const pin = notePin.checked;
    const date = new Date();
    const id = Date.now();
    const note = { title, content, color, pin, date, id };
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    noteForm.reset();
});

//display
function displayNotes() {
    notes.sort((a, b) => {
        return b.pin - a.pin;
    });    
    let html = '';
    notes.forEach(note => {
        if (note.pin) {
            html += `<li class="pinned" style="background-color: ${note.color}">`;
        } else {
            html += `<li style="background-color: ${note.color}">`;
        }
        html += `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <p>Data utworzenia: ${formattedDate}</p>
            <button onclick="editNote(${note.id})">Edytuj</button>
            <button onclick="deleteNote(${note.id})">Usuń</button>
        </li>
        `;
    });
    notesList.innerHTML = html;
}


// delete
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}


//edit 

let noteToEdit;

function editNote(id) {
    noteToEdit = notes.find(note => note.id === id);
    document.querySelector("#edit-form").style.display = "block";
    document.querySelector("#edit-title").value = noteToEdit.title;
    document.querySelector("#edit-content").value = noteToEdit.content;
    document.querySelector("#edit-color").value = noteToEdit.color;
    document.querySelector("#edit-pin").checked = noteToEdit.pin;

    document.querySelector("#edit-form").addEventListener("submit", saveChanges);
}

function saveChanges(e) {
    e.preventDefault();
    const newTitle = document.querySelector("#edit-title").value;
    const newContent = document.querySelector("#edit-content").value;
    const newColor = document.querySelector("#edit-color").value;
    const newPin = document.querySelector("#edit-pin").checked;

    noteToEdit.title = newTitle;
    noteToEdit.content = newContent;
    noteToEdit.color = newColor;
    noteToEdit.pin = newPin;

    document.querySelector("#edit-form").style.display = "none";

    localStorage.setItem('notes', JSON.stringify(notes));

    displayNotes();
}

function saveChanges(e) {
    e.preventDefault();

    const newTitle = document.querySelector("#edit-title").value;
    const newContent = document.querySelector("#edit-content").value;
    const newColor = document.querySelector("#edit-color").value;
    const newPin = document.querySelector("#edit-pin").checked;

    noteToEdit.title = newTitle;
    noteToEdit.content = newContent;
    noteToEdit.color = newColor;
    noteToEdit.pin = newPin;

    document.querySelector("#edit-form").style.display = "none";

    localStorage.setItem('notes', JSON.stringify(notes));

    displayNotes();
}


