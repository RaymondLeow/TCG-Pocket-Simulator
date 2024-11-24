import MainPage from "./components/section/MainPage";
import React from "react";
import tw from "twin.macro";
const Section = tw.div`lg:overflow-x-hidden`;

const StartPage = () => {
  return (
    <>
      <Section>
        <MainPage />
      </Section>
    </>
  );
};

export default StartPage;
