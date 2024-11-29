import React from "react";

export default function Navbar({ onSearch }) {
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="note-app__header">
      <h1>Notes</h1>
      <input type="text" placeholder="Search..." onChange={handleSearchChange} />
    </div>
  );
}
