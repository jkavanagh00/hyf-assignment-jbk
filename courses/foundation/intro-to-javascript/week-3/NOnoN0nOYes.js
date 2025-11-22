const notes = [];

function saveNote(content, id) {
  notes.push({
    content: content,
    id: id,
  });
}

function getNote(id) {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) return notes[i]
  }
  return "Invalid ID entered"
}

function favouriteNote(id) {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      notes[i].favourite = true;
      break;
    }
  }
}

function logOutNotesFormatted() {
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    console.log(`The note with id: ${note.id}, has the following note text: ${note.content}`);
  }
}

function logOutFavouritesFormatted() {
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    if (note.favourite) {
      console.log(`The note with id: ${note.id}, has the following note text: ${note.content}`);
    }
  }
}