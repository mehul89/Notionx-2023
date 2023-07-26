import React from "react";
import Notes from "./Notes";

const Home = (props) => {

  const {darkMode} = props;

  const {showAlert} = props;
  
  return (
    <>
      <div>
        <Notes showAlert={showAlert} darkMode={darkMode}  />
      </div>
    </>
  );
};

export default Home;
