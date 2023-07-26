import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/noteContext";

export const AddNote = (props) => {

  const { darkMode } = props; // Receive darkMode prop

  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2 className={darkMode ? "text-white" : "text-black"}>Add a note</h2>
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="exampleInputEmail1" className={`form-label ${darkMode ? "text-white" : "text-black"}`}>
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title} 
            onChange={onChange}
            minLength={5} 
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className={`form-label ${darkMode ? "text-white" : "text-black"}`}>
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description} 
            onChange={onChange}
            minLength={5} 
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className={`form-label ${darkMode ? "text-white" : "text-black"}`}>
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag} 
            onChange={onChange}
            minLength={5} 
            required
          />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5}  type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};
