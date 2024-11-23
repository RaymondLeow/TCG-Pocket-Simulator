import FirstPage from "./components/section/FirstPage";
import React from "react";
import tw from "twin.macro";
const Section = tw.div`overflow-x-visible lg:overflow-x-hidden h-screen`;

const StartPage = () => {
  return (
    <>
      <Section>
        <FirstPage />
      </Section>
    </>
  );
};

export default StartPage;
