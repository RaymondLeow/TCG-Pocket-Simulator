import tw from "twin.macro";
import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import ApexCharizardLogo from "../../images/genetic-apex-charizard-logo.png";
import ApexMewtwoLogo from "../../images/genetic-apex-mewtwo-logo.png";
import ApexPikachuLogo from "../../images/genetic-apex-pikachu-logo.png";

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavIcon = styled.div`
  flex: 0 0 auto;
  padding: 10px 20px;
  font-size: 16px;
`;

const SidebarNav = styled.nav`
  background: #fecc01;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
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

const SidebarClose = tw.button`p-4 text-2xl font-bold`;
const NavButton = tw.button`text-2xl font-bold`;

const ImageButton = ({ imageSrc, packData, alt, onButtonClick }) => {
  const handleClick = () => {
    onButtonClick(packData);
  };

  return <ImageButtonImage src={imageSrc} alt={alt} onClick={handleClick} />;
};

const Sidebar = ({ onButtonClick }) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleButtonClick = (packData) => {
    onButtonClick(packData);
  };

  return (
    <>
      <Nav>
        <NavIcon to="#">
          <NavButton onClick={showSidebar}>☰</NavButton>
        </NavIcon>
        <CenterContainer>
          <Header />
        </CenterContainer>
        <NavIcon to="#">
          {/* <button onClick={showSidebar}>☰</button> */}
        </NavIcon>
      </Nav>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <SidebarClose onClick={showSidebar}>X</SidebarClose>
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
    </>
  );
};

export default Sidebar;
