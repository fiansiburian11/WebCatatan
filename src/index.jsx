import React from "react";
import { createRoot } from "react-dom/client";

// Import style
import "./styles/style.css";
import Navbar from "./components/Navbar";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

const root = createRoot(document.getElementById("root"));
root.render(
  <div>
    <NoteList />
  </div>
);
