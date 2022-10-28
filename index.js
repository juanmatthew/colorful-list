
//reference to note section application container
const noteSection = document.getElementByID("note-container");

//reference to add new note button
const addNewNoteBtn = noteSection.querySelector(".add-new-note-btn");

//to display all notes saved for user
getSavedNotes().forEach(note => {
    const noteElement = buildNoteElement(note.id, note.content);
    
});

addNewNoteBtn.addEventListener("click", () => addNewNote());


//to retrieve saved notes
function getSavedNotes() {
    return JSON.parse(localStorage.getItem("stickynotes") || "[]");
};

//to save notes with notes array
function saveNotes(notes) {
    localStorage.setItem("stickynotes", JSON.stringify(notes));
};

//building a new html element - a note
function buildNoteElement (id, content){
    //const elementTitle = noteSection.createElement("input")

    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Description...";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dbclick", () => {
        const toDelete = confirm("Do you wish to delete this note?");

        if(toDelete) {
            deletedNotes(id, element);
        };
    });

    return element;
};

//to add new note and save it to local storage
function addNewNote() {
    const notes = getSavedNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = buildNoteElement(noteObject.id, noteObject.content);

    notes.push(noteObject);
    saveNotes(notes);
};

//to update note without creating a new one
function updateNote(id, newNote) {
    const notes = getSavedNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newNote;
    saveNotes(notes);
};

//to delete the note
function deletedNotes(id, element) {
    const notes = getSavedNotes().filter(note => note.id != id);

    saveNotes(notes);
    noteSection.removeChild(element);
};