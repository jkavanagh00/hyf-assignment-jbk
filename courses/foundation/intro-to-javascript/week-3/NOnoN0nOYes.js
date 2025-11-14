const notes = [];

function saveNote(content, id) {
  notes.push({
    content: content,
    id: id
  });
}

function getNote(id) {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) return notes[i]
  }
  return "Invalid ID entered"
}

function logOutNotesFormatted() {
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    console.log(`The note with id: ${note.id}, has the following note text: ${note.content}`);
  }
}