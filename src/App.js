import React, { useState } from "react";
import tw from "twin.macro";
import GlobalStyles from "styles/GlobalStyles";
import Sidebar from "components/features/Sidebar.js";
import { HashRouter, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage.js";

const Container = tw.div`w-fit lg:w-full`;

const App = () => {
  const [packData, setPackData] = useState("mewtwo");

  const handleChangePack = (pack) => {
    setPackData(pack);
  };

  return (
    <>
      <Container>
        <Sidebar onButtonClick={handleChangePack} />
        <Routes>
          <Route path="/" element={<StartPage packData={packData} />} />
        </Routes>
      </Container>
    </>
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
