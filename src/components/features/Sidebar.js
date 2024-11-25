import tw from "twin.macro";
import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import ApexCharizardLogo from "../../images/genetic-apex-charizard-logo.png";
import ApexMewtwoLogo from "../../images/genetic-apex-mewtwo-logo.png";
import ApexPikachuLogo from "../../images/genetic-apex-pikachu-logo.png";
import { useData } from "../context/DataContext";

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
  justify-content: center;
  width: 200px;
  position: fixed;
  top: 0;
  left: ${({ sidebar, left }) => {
    if (left) {
      return sidebar ? "0" : "-100%";
    }
    return sidebar ? "calc(100vw - 200px)" : "100%";
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

const TrackerText = tw.div`text-xl font-bold p-2`;

const NavButton = tw.button`text-4xl font-bold`;

const ImageButton = ({ imageSrc, packData, alt, onButtonClick }) => {
  const handleClick = () => {
    onButtonClick(packData);
  };

  return <ImageButtonImage src={imageSrc} alt={alt} onClick={handleClick} />;
};

const Sidebar = ({ onButtonClick }) => {
  const { data } = useData();

  const [leftSidebar, setLeftSidebar] = useState(false);
  const [rightSidebar, setRightbar] = useState(false);

  const showLeftSidebar = () => setLeftSidebar(!leftSidebar);
  const showRightSidebar = () => setRightbar(!rightSidebar);

  const handleButtonClick = (packData) => {
    onButtonClick(packData);
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
            Object.keys(data.history[key].cards).map((c) => {
              tierCollected += data.history[key].cards[c].counter;
            });
            return (
              <TrackerContainer key={`tracker-${key}`}>
                <TierImage
                  src={data.history[key].image}
                  alt={data.history[key].title}
                />
                <TrackerText>{tierCollected}</TrackerText>
              </TrackerContainer>
            );
          })}
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Sidebar;