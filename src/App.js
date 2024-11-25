import React, { useState } from "react";
import tw from "twin.macro";
import GlobalStyles from "styles/GlobalStyles";
import Sidebar from "components/features/Sidebar.js";
import { HashRouter, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage.js";
import BackgroundImage from "./images/container_bg.png";
import { DataProvider } from "components/context/DataContext.js";
const Container = tw.div`w-screen h-screen overflow-hidden`;

const Background = tw.div`
  absolute inset-0 bg-contain bg-center transform z-0 overflow-hidden
`;

const App = () => {
  const [packData, setPackData] = useState("mewtwo");

  const handleChangePack = (pack) => {
    setPackData(pack);
  };

  return (
    <DataProvider>
      <Container>
        <Background
          style={{
            backgroundImage: `url(${BackgroundImage}`,
          }}
        />
        <Sidebar onButtonClick={handleChangePack} />
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
