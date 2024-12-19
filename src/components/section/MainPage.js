import styled from "styled-components"
import Packs from "components/features/Packs";

// const Section = tw.div`relative flex justify-center items-center flex-col overflow-hidden`;
const Section = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`

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
