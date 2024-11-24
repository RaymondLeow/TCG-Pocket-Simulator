import MainPage from "./components/section/MainPage";
import React from "react";
import tw from "twin.macro";
const Section = tw.div`lg:overflow-hidden`;

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
