import tw from "twin.macro";
import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import ApexCharizardLogo from "../../images/genetic-apex-charizard-logo.png";
import ApexMewtwoLogo from "../../images/genetic-apex-mewtwo-logo.png";
import ApexPikachuLogo from "../../images/genetic-apex-pikachu-logo.png";
import { useData } from "../context/DataContext";
import { getPackType } from "./Calculator";

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const NavIcon = styled.div`
  flex: 0 0 auto;
  padding: 10px 20px;
  font-size: 16px;
`;

const SidebarNav = styled.nav`
  border-right: 3px solid #232323;
  border-left: 3px solid #232323;
  background: #fff;
  height: 100vh;
  display: flex;
  overflow-y: auto;
  justify-content: center;
  width: ${({ left }) => {
    if (left) {
      return "200px";
    }
    return "300px";
  }};
  position: fixed;
  top: 0;
  left: ${({ sidebar, left }) => {
    if (left) {
      return sidebar ? "0" : "-100%";
    }
    return sidebar ? "calc(100vw - 300px)" : "100%";
  }};
  transition: 250ms;
  z-index: 10;
`;

const CenterContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: flex;
  width: 400px;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const ImageButtonImage = styled.img`
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;

  &:hover {
    transform: scale(1.05) translateY(-5px);
  }

  &:active {
    transform: translateY(5px);
  }
`;

const TierImage = styled.img`
  margin: 0.5rem;
  height: 25px;
`;

const SidebarButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SidebarClose = styled.button`
  padding: 1rem;
  font-size: 2.25rem;
  font-weight: bold;
  float: ${({ left }) => {
    if (left) {
      return "left";
    }
    return "right";
  }};
`;

const TrackerContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Separator = styled.div`
  margin-top: 2rem;
`;

export const FlexGrid = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows items to wrap to the next row */
  gap: 3px; /* Adds space between items */
  align-items: center;
`;

export const FlexItem = styled.div`
  flex: 1 1 calc(33% - 12px); /* Adjust width for 4 items per row with spacing */
  box-sizing: border-box; /* Ensures padding and borders are included in width/height */
  max-width: calc(33% - 4px);
  padding: 4px;
  margin: ${(props) => (props.collected ? "1px" : "2px")};
  min-height: 63px;
  border-radius: 10px;
  text-align: center; /* Example text alignment */
  color: ${(props) => (props.collected ? "auto" : "gray")};
  border: ${(props) =>
    props.collected ? "4px solid green" : "2px solid gray"};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1rem;
`;

const TrackerText = tw.div`text-xl font-bold p-2`;

const NavButton = tw.button`text-4xl font-bold`;

const ImageButton = ({ imageSrc, packData, alt, onButtonClick }) => {
  const handleClick = () => {
    onButtonClick(packData);
  };

  return <ImageButtonImage src={imageSrc} alt={alt} onClick={handleClick} />;
};

const concatPack = (pack1, pack2) => {
  let result = {};
  Object.keys(pack1).forEach((tier) => {
    result[tier] = pack1[tier].concat(pack2[tier]);
  });
  return result;
};

const Sidebar = ({ onButtonClick }) => {
  const { data } = useData();
  const [pack, setPack] = useState(
    concatPack(getPackType("mewtwo"), getPackType("all"))
  );

  const [leftSidebar, setLeftSidebar] = useState(false);
  const [rightSidebar, setRightbar] = useState(false);

  const showLeftSidebar = () => setLeftSidebar(!leftSidebar);
  const showRightSidebar = () => setRightbar(!rightSidebar);

  const handleButtonClick = (packData) => {
    onButtonClick(packData);
    setPack(concatPack(getPackType(packData), getPackType("all")));
  };

  return (
    <>
      <Nav>
        <NavIcon to="#">
          <NavButton onClick={showLeftSidebar}>☰</NavButton>
        </NavIcon>
        <CenterContainer>
          <Header />
        </CenterContainer>
        <NavIcon to="#">
          <NavButton onClick={showRightSidebar}>⧗</NavButton>
        </NavIcon>
      </Nav>
      <SidebarNav sidebar={leftSidebar} left={true}>
        <SidebarWrap>
          <SidebarClose onClick={showLeftSidebar} left={true}>
            ☰
          </SidebarClose>
          <ImageButton
            imageSrc={ApexMewtwoLogo}
            alt="Open Genetic Apex Mewtwo Pack"
            packData="mewtwo"
            onButtonClick={() => handleButtonClick("mewtwo")}
          />
          <ImageButton
            imageSrc={ApexPikachuLogo}
            alt="Open Genetic Apex Pikachu Pack"
            packData="pikachu"
            onButtonClick={() => handleButtonClick("pikachu")}
          />
          <ImageButton
            imageSrc={ApexCharizardLogo}
            alt="Open Genetic Apex Charizard Pack"
            packData="charizard"
            onButtonClick={() => handleButtonClick("charizard")}
          />
        </SidebarWrap>
      </SidebarNav>
      <SidebarNav sidebar={rightSidebar} left={false}>
        <SidebarWrap>
          <SidebarButtonContainer>
            <SidebarClose onClick={showRightSidebar} left={false}>
              ⧗
            </SidebarClose>
          </SidebarButtonContainer>
          <TrackerContainer>
            <TrackerText>Opened</TrackerText>
            <TrackerText>{data.packsOpened}</TrackerText>
          </TrackerContainer>
          <Separator />
          {Object.keys(data.uniqueTracker).map((key) => {
            return (
              <TrackerContainer key={`tracker-${key}`}>
                <TrackerText>{data.uniqueTracker[key].title}</TrackerText>
                <TrackerText>
                  {data.uniqueTracker[key].collected} /{" "}
                  {data.uniqueTracker[key].maxUnique}
                </TrackerText>
              </TrackerContainer>
            );
          })}
          <Separator />
          {Object.keys(data.history).map((key) => {
            let tierCollected = 0;
            Object.keys(data.history[key].cards).forEach((c) => {
              tierCollected += data.history[key].cards[c].counter;
            });
            return (
              <>
                <TrackerContainer key={`tracker-${key}`}>
                  <TierImage
                    src={data.history[key].image}
                    alt={data.history[key].title}
                  />
                  <TrackerText>{tierCollected}</TrackerText>
                </TrackerContainer>
                <FlexGrid>
                  {pack[key].map((card, index) => {
                    const collectedCard = data.history[key].cards[card.id];
                    return (
                      <FlexItem
                        key={`tracker-${card.id}`}
                        collected={collectedCard !== undefined}
                      >
                        {collectedCard !== undefined && (
                          <p>
                            <strong>x{collectedCard.counter}</strong>
                          </p>
                        )}
                        <p>{card.name}</p>
                      </FlexItem>
                    );
                  })}
                </FlexGrid>
                <Separator />
              </>
            );
          })}
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Sidebar;
