import React from 'react';
import DefaultFooter from "./Components/footer";
import NavbarComp from "./Components/navbar";
import OCRComp from "./Components/OCR";
import "./App.css";
const App = () => {
  return (
      <div className='App'>
          <div style={{ display: "flex",flexDirection: "column", minHeight: "90vh",backgroundColor:'#F5F6FA' }}>
              <NavbarComp/>
              <OCRComp/>
          </div>
          <DefaultFooter/>
      </div>

  );
};
export default App;

