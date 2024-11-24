import tw from "twin.macro";
import Packs from "components/features/Packs";
const Section = tw.div`relative flex justify-center items-center flex-col overflow-hidden`;

const MainPage = ({ packData }) => {
  return (
    <>
      <Section>
        <Packs packData={packData} />
      </Section>
    </>
  );
};

export default MainPage;
