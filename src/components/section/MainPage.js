import styled from "styled-components"
import Packs from "components/features/Packs";

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
