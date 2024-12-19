import styled from "styled-components"
import React, { useState } from "react";
import Header from "../Header";
import ApexCharizardLogo from "../../../images/genetic-apex-charizard-logo.png";
import ApexMewtwoLogo from "../../../images/genetic-apex-mewtwo-logo.png";
import ApexPikachuLogo from "../../../images/genetic-apex-pikachu-logo.png";
import MythicalIslandLogo from "../../../images/mythical-island-logo.png"
import { useData } from "../../context/DataContext";
import { getPackType, getPackTypeData } from "../Calculator";
import { getImage } from "components/resources/Prizes";
import { ImageButtonImage, CenterContainer, SidebarNav, ResetButton, ResizableContainer, SidebarWrap, SidebarButtonContainer, SidebarClose, InfoGrid, InfoItem, TrackerContainer, TierImage, FlexGrid, FlexItem, CardCounter, Separator, Nav, Resizer} from "./SidebarDiv";


const DataText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;
const InfoText = styled.div`
  font-size: 0.75rem;
`;

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
  const { data, resetData } = useData();
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
        <CenterContainer>
          <Header />
        </CenterContainer>
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
          <ImageButton
            imageSrc={MythicalIslandLogo}
            alt="Open Mythical Island Pack"
            packData="mew"
            selected={packData === "mew"}
            onButtonClick={() => handleButtonClick("mew")}
          />
          <ResetButton onClick={resetData}>Clear Save Data</ResetButton>
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
              {Object.keys(data.uniqueTracker).map((trackKey) => {
                return (
                  <InfoItem key={`tracker-${trackKey}`}>
                    <DataText>
                      {data.uniqueTracker[trackKey].collected}/
                      {data.uniqueTracker[trackKey].maxUnique}
                    </DataText>
                    <InfoText>{data.uniqueTracker[trackKey].title}</InfoText>
                  </InfoItem>
                );
              })}
            </InfoGrid>
            <Separator />
            {Object.keys(data.history).map((historyKey) => {
              return (
                <div key={`tracker-${historyKey}`}>
                  <TrackerContainer>
                    <TierImage
                      src={data.history[historyKey].image}
                      alt={data.history[historyKey].title}
                    />
                  </TrackerContainer>
                  <FlexGrid>
                    {pack[historyKey].map((card) => {
                      const collectedCard =
                        data.history[historyKey].cards[card.id];
                      const collected = collectedCard !== undefined
                      const packTypeData = collected ? getPackTypeData(collectedCard.packType) : ''
                      return (
                        <FlexItem
                          key={`tracker-${historyKey}-${card.id}`}
                          collected={collectedCard}
                          style={{ 
                            backgroundImage: `url(${collected ? getImage(card.id, packTypeData, true) : ''})`,
                          }}
                        >
                            <CardCounter collected={collected}>
                              {collected ? `x${collectedCard.counter}` : "?"}
                            </CardCounter>
                        </FlexItem>
                      );
                    })}
                  </FlexGrid>
                  <Separator />
                </div>
              );
            })}
          </SidebarWrap>
        </SidebarNav>
      </ResizableContainer>
    </>
  );
};

export default Sidebar;
