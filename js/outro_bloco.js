const noteArea = document.getElementById('note');
const newNoteBtn = document.getElementById('new-note');
const deleteNoteBtn = document.getElementById('delete-note');
const noteSelect = document.getElementById('note-select');

function loadNoteList() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  noteSelect.innerHTML = '';
  notes.forEach(n => {
    const o = document.createElement('option');
    o.value = n.id;
    o.textContent = n.title || 'Nota';
    noteSelect.appendChild(o);
  });
}
function loadNote(id) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const note = notes.find(n => n.id === id);
  noteArea.value = note ? note.content : '';
}
function saveNote() {
  // lógica para salvar ou atualizar
}
// ... resto do código como no tutorial...
loadNoteList();