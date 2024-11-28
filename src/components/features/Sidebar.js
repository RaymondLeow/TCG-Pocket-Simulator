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
  width: 100%;
`;

const NavIcon = styled.div`
  flex: 1 1 80px;
  // padding: 10px 20px;
  width: 80px;
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
  width: ${({ width }) => `${width}px`};
  position: fixed;
  top: 0;
  left: ${({ sidebar, left, width }) => {
    if (left) {
      return sidebar ? "0" : "-100%";
    }
    return sidebar ? `calc(100vw - ${width}px)` : "100%";
  }};
  transition: 250ms;
  z-index: 10;
`;

const CenterContainer = styled.div`
  flex: 1 1 100%;
  margin-left: 80px;
  margin-right: 80px;
`;

const SidebarWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: 80px;
`;

const ImageButtonImage = styled.img`
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
  background: ${({ selected }) => (selected ? "rgba(0, 0, 0, 0.2)" : "none")};
  box-shadow: ${({ selected }) =>
    selected
      ? "inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)"
      : "none"};
  border-radius: 8px;
  margin: 5px;

  &:active {
    background: #d0d0d0;
    transform: translateY(3px);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

const TierImage = styled.img`
  margin: 0.5rem;
  height: 25px;
`;

// const SidebarButtonContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `;

// const SidebarClose = styled.button`
//   padding: 1rem;
//   font-size: 2.25rem;
//   font-weight: bold;
// `;

const SidebarButtonContainer = styled.div`
  position: fixed;
  right: ${({ left }) => (left ? "auto" : "20px")};
  left: ${({ left }) => (left ? "10px" : "auto")};
  top: 10px;
`;

const SidebarClose = styled.button`
  height: 60px;
  width: 60px;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border: none;
  justify-content: flex-end;
  transition: transform 0.3s ease, background-color 0.3s ease;

  :hover {
    background-color: #eee;
    transform: scale(1.1);
  }

  :active {
    background-color: #eee;
    transform: scale(0.9);
  }

  font-size: 2.25rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
`;

const TrackerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Separator = styled.div`
  margin-top: 2rem;
`;

export const FlexGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const InfoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const FlexItem = styled.div`
  width: 95px;
  box-sizing: border-box;
  margin: 6px;
  min-height: 63px;
  border-radius: 10px;
  text-align: center;
  color: ${(props) => (props.collected ? "auto" : "gray")};
  border: ${(props) =>
    props.collected ? "4px solid green" : "2px solid gray"};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 0.9rem;
`;

export const InfoItem = styled.div`
  flex: 1 1 95px;
  max-width: 95px;
  box-sizing: border-box;
  margin: 6px;
  margin-bottom: 10px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  font-size: 0.9rem;
  height: 73px;
`;

const ResizableContainer = styled.div`
  display: flex;
  user-select: none;
`;

const Resizer = styled.div`
  width: 10px;
  margin-right: 2px;
  cursor: ew-resize;
  background-color: #ccc;
  height: 100%;
  flex-shrink: 0;
  background: linear-gradient(135deg, #e0e0e0 25%, #c1c1c1 50%, #e0e0e0 75%);
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.2);
  transition: background 0.2s ease, box-shadow 0.2s ease;
  :hover {
    background: linear-gradient(135deg, #d1d1d1 25%, #b0b0b0 50%, #d1d1d1 75%);
    box-shadow: 1px 0 6px rgba(0, 0, 0, 0.3); /* Enhanced shadow effect on hover */
  }
`;

const TrackerText = tw.div`text-xl font-bold p-2`;
const DataText = tw.div`text-2xl font-bold`;
const InfoText = tw.div`text-xs`;

const NavButton = tw.button`text-2xl sm:text-4xl font-bold`;

const ImageButton = ({ imageSrc, packData, alt, onButtonClick, selected }) => {
  const handleClick = () => {
    onButtonClick(packData);
  };

  return (
    <ImageButtonImage
      src={imageSrc}
      alt={alt}
      selected={selected}
      onClick={handleClick}
    />
  );
};

const concatPack = (pack1, pack2) => {
  let result = {};
  Object.keys(pack1).forEach((tier) => {
    result[tier] = pack1[tier].concat(pack2[tier]);
  });
  return result;
};

const leftWidth = 200;

const Sidebar = ({ onButtonClick, sidebarWidth, onMouseDown }) => {
  const { data } = useData();
  const [pack, setPack] = useState(
    concatPack(getPackType("mewtwo"), getPackType("all"))
  );
  const [packData, setPackData] = useState("mewtwo");

  const [leftSidebar, setLeftSidebar] = useState(false);
  const [rightSidebar, setRightbar] = useState(false);

  const showLeftSidebar = () => setLeftSidebar(!leftSidebar);
  const showRightSidebar = () => setRightbar(!rightSidebar);

  const handleButtonClick = (packData) => {
    onButtonClick(packData);
    setPackData(packData);
    setPack(concatPack(getPackType(packData), getPackType("all")));
  };

  return (
    <>
      <Nav>
        {/* <NavIcon to="#"> */}
        {/* <NavButton onClick={showLeftSidebar}>☰</NavButton> */}
        {/* </NavIcon> */}
        <CenterContainer>
          <Header />
        </CenterContainer>
        {/* <NavIcon to="#"> */}
        {/*<NavButton onClick={showRightSidebar}>⧗</NavButton>*/}
        {/* </NavIcon> */}
      </Nav>
      <SidebarNav sidebar={leftSidebar} left={true} width={leftWidth}>
        <SidebarWrap>
          <SidebarButtonContainer left={true}>
            <SidebarClose onClick={showLeftSidebar} left={true}>
              ☰
            </SidebarClose>
          </SidebarButtonContainer>
          <ImageButton
            imageSrc={ApexMewtwoLogo}
            alt="Open Genetic Apex Mewtwo Pack"
            packData="mewtwo"
            selected={packData === "mewtwo"}
            onButtonClick={() => handleButtonClick("mewtwo")}
          />
          <ImageButton
            imageSrc={ApexPikachuLogo}
            alt="Open Genetic Apex Pikachu Pack"
            packData="pikachu"
            selected={packData === "pikachu"}
            onButtonClick={() => handleButtonClick("pikachu")}
          />
          <ImageButton
            imageSrc={ApexCharizardLogo}
            alt="Open Genetic Apex Charizard Pack"
            packData="charizard"
            selected={packData === "charizard"}
            onButtonClick={() => handleButtonClick("charizard")}
          />
        </SidebarWrap>
      </SidebarNav>
      <ResizableContainer>
        <SidebarNav sidebar={rightSidebar} left={false} width={sidebarWidth}>
          <Resizer onMouseDown={onMouseDown} />
          <SidebarWrap>
            <SidebarButtonContainer left={false}>
              <SidebarClose onClick={showRightSidebar} left={false}>
                ⧗
              </SidebarClose>
            </SidebarButtonContainer>
            <InfoGrid>
              <InfoItem>
                <DataText>{data.packsOpened}</DataText>
                <InfoText>Opened</InfoText>
              </InfoItem>
              {Object.keys(data.uniqueTracker).map((key) => {
                return (
                  <InfoItem key={`tracker-${key}`}>
                    <DataText>
                      {data.uniqueTracker[key].collected}/
                      {data.uniqueTracker[key].maxUnique}
                    </DataText>
                    <InfoText>{data.uniqueTracker[key].title}</InfoText>
                  </InfoItem>
                );
              })}
            </InfoGrid>
            <Separator />
            {Object.keys(data.history).map((key) => {
              let tierCollected = 0;
              Object.keys(data.history[key].cards).forEach((c) => {
                tierCollected += data.history[key].cards[c].counter;
              });
              return (
                <>
                  <TrackerContainer key={`tracker-${key}`}>
                    {/* <TrackerText>{tierCollected}</TrackerText> */}
                    <TierImage
                      src={data.history[key].image}
                      alt={data.history[key].title}
                    />
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
      </ResizableContainer>
    </>
  );
};

export default Sidebar;
