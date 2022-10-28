
//reference to notes container
const notesContainer = document.getElementById("app");
//reference to add new note button
const addNoteBtn = notesContainer.querySelector(".add-note-btn");


//to display all notes saved for user
getSavedNotes().forEach(note => {

    const noteElement = buildNoteElement(note.id, note.content);

    notesContainer.insertBefore(noteElement, addNoteBtn);

});

//add note button event listener
addNoteBtn.addEventListener("click", () => addNote());


//to retrieve saved notes
function getSavedNotes() {
    return JSON.parse(localStorage.getItem ("stickynotes") || "[]");
};

//to save the notes on local storage
function saveNotes(notes) {
    localStorage.setItem("stickynotes", JSON.stringify(notes));
};

//building a new html element - a note
function buildNoteElement(id, content) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Note it!";

    //event listener to save updated note to local storage
    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    //event listener for double click to delete
    element.addEventListener("dblclick", () => {
        const toDelete = confirm("Do you wish to delete this note?");

        if (toDelete){
            deletedNotes(id, element);
        };
    });

    return element;
};

//to add notes and store them
function addNote() {
    const notes = getSavedNotes();

    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content:""
    };

    const noteElement = buildNoteElement(noteObject.id, noteObject.content);

    notesContainer.insertBefore(noteElement, addNoteBtn);

    notes.push(noteObject);
    saveNotes(notes);

};

//to update note without replacing it
function updateNote(id, newContent) {
    const notes = getSavedNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
};

//to delete note
function deletedNotes(id, element) {
    const notes =  getSavedNotes().filter(note => note.id != id); 
    
    saveNotes(notes);
    notesContainer.removeChild(element);
};
