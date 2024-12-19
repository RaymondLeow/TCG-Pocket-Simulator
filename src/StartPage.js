import MainPage from "./components/section/MainPage";
import React from "react";
import styled from "styled-components"

// const Section = tw.div`lg:overflow-hidden`;
const Section = styled.div`
  overflow: hidden;
`

const StartPage = ({ packData }) => {
  return (
    <>
      <Section>
        <MainPage packData={packData} />
      </Section>
    </>
  );
};

export default StartPage;
