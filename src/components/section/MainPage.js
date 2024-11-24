import tw from "twin.macro";
import ResponsivePicture from "components/features/ResponsivePicture";
import myImage from "../../images/title-logo.png";

const Section = tw.div`relative flex justify-center items-center h-screen flex-col`;
const Image = tw.img`w-[300px] h-auto`;

export default function MainPage() {
  return (
    <Section>
      <Image src={myImage} alt="Title" />
      <ResponsivePicture />
    </Section>
  );
}
