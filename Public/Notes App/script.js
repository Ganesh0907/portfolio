const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

// Load saved notes from localStorage when the app starts
window.addEventListener('DOMContentLoaded', loadNotes);

// Add new note
addNoteBtn.addEventListener('click', () => {
  createNote();
});

// Function to create a new note
function createNote(text = "") {
  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note');

  const textarea = document.createElement('textarea');
  textarea.value = text;
  noteDiv.appendChild(textarea);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = "Delete";
  noteDiv.appendChild(deleteBtn);

  // Event: Delete a note
  deleteBtn.addEventListener('click', () => {
    noteDiv.remove();
    saveNotes();
  });

  // Event: Save note whenever user types
  textarea.addEventListener('input', saveNotes);

  notesContainer.appendChild(noteDiv);
  saveNotes();
}

// Function to save notes to localStorage
function saveNotes() {
  const notes = [];
  const textareas = notesContainer.querySelectorAll('textarea');
  textareas.forEach(note => notes.push(note.value));

  localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load notes from localStorage
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  savedNotes.forEach(noteText => createNote(noteText));
}
