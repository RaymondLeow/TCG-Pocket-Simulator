import React from "react";
import tw from "twin.macro";
import GlobalStyles from "styles/GlobalStyles";
import Sidebar from "components/features/Sidebar.js";
import { HashRouter, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage.js";

const Container = tw.div`w-fit lg:w-full`;

const App = () => {
  return (
    <>
      <Container>
        <Sidebar />
        <Routes>
          <Route path="/" element={<StartPage />} />
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
