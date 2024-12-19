import React, { useState, useRef, useEffect } from "react";
import GlobalStyles from "styles/GlobalStyles";
import styled from "styled-components";
import Sidebar from "components/features/sidebar/Sidebar.js";
import { HashRouter, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage.js";
import BackgroundImage from "./images/container_bg.png";
import { DataProvider } from "components/context/DataContext.js";

const Container = styled.div`
  width: 100vw; 
  overflow: hidden; 
  display: flex,
  height: 100vh;  
`;

const Background = styled.div`
  position: absolute;
  background-size: contain;
  background-position: center;
  overflow: hidden;
  inset: 0;
  z-index: 0;
`

const defaultWidth = 360;

const App = () => {
  const [packData, setPackData] = useState("mewtwo");
  const [sidebarWidth, setSidebarWidth] = useState(defaultWidth);
  const isResizing = useRef(false);

  const handleChangePack = (pack) => {
    setPackData(pack);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing.current) {
        setSidebarWidth((prevWidth) =>
          Math.max(250, Math.min(prevWidth - e.movementX, 800))
        );
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
    };

    // Attach events to the document for global resizing
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      // Clean up listeners when component unmounts
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    isResizing.current = true;
  };

  return (
    <DataProvider>
      <Container>
        <Background
          style={{
            backgroundImage: `url(${BackgroundImage}`,
          }}
        />
        <Sidebar
          onButtonClick={handleChangePack}
          sidebarWidth={sidebarWidth}
          onMouseDown={handleMouseDown}
          style={{
            position: "absolute",
          }}
        />
        <Routes>
          <Route path="/" element={<StartPage packData={packData} />} />
        </Routes>
      </Container>
    </DataProvider>
  );
};

const Root = () => (
  <>
    <GlobalStyles />
    <HashRouter>
      <App />
    </HashRouter>
  </>
);

export default Root;
