import MainPage from "./components/section/MainPage";
import React from "react";
import tw from "twin.macro";
const Section = tw.div`overflow-x-visible lg:overflow-x-hidden h-screen`;

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
