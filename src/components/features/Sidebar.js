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

const SidebarClose = tw.button`p-4 text-2xl font-bold`;
const NavButton = tw.button`text-2xl font-bold`;

const Image = tw.img`p-4`;

const Sidebar = ({ onButtonClick }) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleClick = (packData) => {
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
          <Image
            src={ApexMewtwoLogo}
            alt="Open Genetic Apex Mewtwo Pack"
            onClick={() => handleClick("mewtwo")}
          />
          <Image
            src={ApexPikachuLogo}
            alt="Open Genetic Apex Pikachu Pack"
            onClick={() => handleClick("pikachu")}
          />
          <Image
            src={ApexCharizardLogo}
            alt="Open Genetic Apex Charizard Pack"
            onClick={() => handleClick("charizard")}
          />
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Sidebar;
