import tw from "twin.macro";
import { useState } from "react";
import ResponsivePicture from "components/features/ResponsivePicture";
import { Header } from "components/features/Header";
const Section = tw.div`relative flex justify-center items-center flex-col`;

export default function MainPage() {
  return (
    <>
      <Section>
        <ResponsivePicture />
      </Section>
    </>
  );
}
