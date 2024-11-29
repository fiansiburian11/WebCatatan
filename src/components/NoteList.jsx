import React, { useState, useEffect } from "react";
import { getInitialData, showFormattedDate } from "../utils"; // Mengambil data awal dari utils
import Navbar from "./Navbar";
import NoteForm from "./NoteForm";

export default function NoteList() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Ambil data awal dari index.js yang sudah didefinisikan di getInitialData
    const initialData = getInitialData();
    setData(initialData); // Simpan data awal dalam state
  }, []);

  const handleAddNote = (note) => {
    // Menambahkan catatan baru ke state sementara (tidak disimpan secara permanen)
    setData((prevData) => [...prevData, note]);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((note) => note.id !== id);
    setData(updatedData); // Menghapus catatan dari state
  };

  const handleArchive = (id) => {
    const updatedData = data.map((note) => (note.id === id ? { ...note, archived: !note.archived } : note));
    setData(updatedData); // Menyimpan perubahan arsip ke state
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // Update query pencarian
  };

  const filteredNotes = data.filter(
    (note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()) && !note.archived // Menampilkan catatan yang tidak diarsipkan
  );

  const archivedNotes = data.filter((note) => note.archived); // Menampilkan catatan yang sudah diarsipkan

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <NoteForm onAddNote={handleAddNote} />
      <h2>Catatan Aktif</h2>
      <div className="notes-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div className="note-item" key={note.id}>
              <div className="note-item__content">
                <h3 className="note-item__title">{note.title}</h3>
                <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
                <p className="note-item__body">{note.body}</p>
              </div>
              <div className="note-item__action">
                <button className="note-item__delete-button" onClick={() => handleDelete(note.id)}>
                  Hapus
                </button>
                <button className="note-item__archive-button" onClick={() => handleArchive(note.id)}>
                  {note.archived ? "Batal Arsipkan" : "Arsipkan"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="notes-list__empty-message">Tidak ada catatan</p>
        )}
      </div>

      <h2>Catatan Arsip</h2>
      <div className="notes-list">
        {archivedNotes.length > 0 ? (
          archivedNotes.map((note) => (
            <div className="note-item" key={note.id}>
              <div className="note-item__content">
                <h3 className="note-item__title">{note.title}</h3>
                <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
                <p className="note-item__body">{note.body}</p>
              </div>
              <div className="note-item__action">
                <button className="note-item__delete-button" onClick={() => handleDelete(note.id)}>
                  Hapus
                </button>
                <button className="note-item__archive-button" onClick={() => handleArchive(note.id)}>
                  {note.archived ? "Batal Arsipkan" : "Arsipkan"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="notes-list__empty-message">Tidak ada catatan arsip</p>
        )}
      </div>
    </div>
  );
}
