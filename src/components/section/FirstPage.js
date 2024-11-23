import { motion } from "framer-motion";
import tw from "twin.macro";
import ResponsivePicture from "components/features/ResponsivePicture";

const Section = tw.div`relative flex justify-center items-center h-screen`;
const ParallaxSection = tw.div`absolute flex justify-center items-center flex-col`;
// const ProfilePicture = tw(ResponsivePicture)``;
const TextFiller = tw.div`h-[170px]`;
const HeightFiller = tw.div`h-[66px]`;
const H1 = tw.h1`font-publicsans text-3xl md:text-5xl font-medium `;
const H2 = tw.h2`font-publicsans text-xl md:text-2xl font-medium text-gray-800 text-center w-calc-full-minus-30`;
const H3 = tw.h3`mb-1 font-publicsans text-lg md:text-xl text-gray-800`;
const Italic = tw.span`font-bold`;

export default function FirstPage() {
  return (
    // <Section>
    // <ProfilePicture></ProfilePicture>
    <ResponsivePicture />
    // </Section>
  );
}
