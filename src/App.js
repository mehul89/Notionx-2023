import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import NoteState from "./Context/notes/NoteState";
import About from "./Components/About";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Footer from "./Components/Footer";

function App() {
  const [alert, setAlert] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "#110f16";
    } else {
      document.body.style.backgroundColor = "aliceblue";
    }
  }, [darkMode]);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar
            handleDarkModeToggle={handleDarkModeToggle}
            darkMode={darkMode}
          />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route
                path="/"
                index
                element={<Home showAlert={showAlert} darkMode={darkMode} />}
              />
              <Route
                exact
                path="/about"
                element={<About darkMode={darkMode} />}
              />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} darkMode={darkMode} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} darkMode={darkMode} />}
              />
            </Routes>
          </div>
          <Footer darkMode={darkMode} />
        </Router>
      </NoteState>
    </>
  );
}

export default App;
