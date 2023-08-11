document.addEventListener('DOMContentLoaded', () => {
    const noteList = document.getElementById('note-list');
    const noteTitleInput = document.getElementById('note-title');
    const noteTextInput = document.getElementById('note-text');
    const saveIcon = document.getElementById('save-icon');
  
    const fetchNotes = async () => {
      try {
        const response = await fetch('/notes');
        const data = await response.json();
        noteList.innerHTML = '';
        data.forEach((note) => {
          const noteItem = document.createElement('div');
          noteItem.classList.add('note-item');
          noteItem.textContent = note.title;
          noteItem.addEventListener('click', () => displayNoteDetails(note));
          noteList.appendChild(noteItem);
        });
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
  
    const displayNoteDetails = (note) => {
      noteTitleInput.value = note.title;
      noteTextInput.value = note.text;
    };
  
    const saveNote = async () => {
      const newNote = {
        title: noteTitleInput.value,
        text: noteTextInput.value,
      };
      try {
        await fetch('/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNote),
        });
        fetchNotes();
      } catch (error) {
        console.error('Error saving note:', error);
      }
    };
    saveIcon.addEventListener('click', saveNote);
    fetchNotes();
  });