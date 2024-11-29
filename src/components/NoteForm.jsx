import React, { useState } from "react";

export default function NoteForm({ onAddNote }) {
  const [note, setNote] = useState({
    title: "",
    body: "", // Menambahkan state untuk body
  });
  const maxLength = 50;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (note.title.trim()) {
      onAddNote({
        id: Date.now(),
        title: note.title,
        body: note.body, // Menambahkan body ketika note baru ditambahkan
        createdAt: new Date().toISOString(),
        archived: false,
      });
      setNote({ title: "", body: "" }); // Reset input setelah menambahkan
    }
  };

  return (
    <div className="note-app__body">
      <div className="note-input">
        <h2 className="note-input__title">Buat catatan</h2>
        <p className="note-input__title__char-limit">Sisa karakter: {maxLength - note.title.length}</p>
        <input name="title" value={note.title} maxLength={maxLength} onChange={handleChange} type="text" placeholder="Ini adalah judul" />
        <textarea name="body" className="note-input__body" value={note.body} onChange={handleChange} placeholder="Tuliskan catatan mu disini"></textarea>
        <button onClick={handleSubmit}>Buat</button>
      </div>
    </div>
  );
}
