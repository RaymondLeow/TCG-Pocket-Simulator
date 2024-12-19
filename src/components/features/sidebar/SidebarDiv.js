
import styled from "styled-components";

export const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
`;

export const SidebarNav = styled.nav`
  border-right: ${({ left }) => (left ? `3px solid #232323` : "none")};
  border-left: ${({ left }) => (left ? "none" : `3px solid #232323`)};
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

export const CenterContainer = styled.div`
  flex: 1 1 100%;
  margin-left: 80px;
  margin-right: 80px;
`;

export const SidebarWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageButtonImage = styled.img`
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

export const TierImage = styled.img`
  margin: 0.5rem;
  height: 25px;
`;

export const SidebarButtonContainer = styled.div`
  position: fixed;
  right: ${({ left }) => (left ? "auto" : "20px")};
  left: ${({ left }) => (left ? "10px" : "auto")};
  top: 10px;
`;

export const SidebarClose = styled.button`
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

export const TrackerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Separator = styled.div`
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
  width: 70px;
  box-sizing: border-box;
  margin: 6px;
  min-height: 97px;
  border-radius: 5px;
  text-align: center;
  color: ${({ collected }) => (collected ? "auto" : "gray")};
  border: ${({ collected }) => (collected ? "4px solid green" : "2px solid gray")};
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 0.9rem;
  justify-content: end;
  padding-bottom: 5px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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

export const ResizableContainer = styled.div`
  display: flex;
  user-select: none;
`;

export const Resizer = styled.div`
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

export const ResetButton = styled.button`
  height: 60px;
  width: 160px;
  margin: 10px;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  color: red;
  transition: transform 0.3s ease, background-color 0.3s ease;

  :hover {
    background-color: #eee;
    transform: scale(1.1);
  }

  :active {
    background-color: #eee;
    transform: scale(0.9);
  }

  font-weight: bold;
  margin-top: auto;
  text-align: center; 
`;

export const CardCounter = styled.div`
    min-height: 30px;
    min-width: 30px;
    border-radius: 10px;
    color: ${({collected}) => (collected ? "white" : "black")};
    background-color: ${({collected}) => (collected ? "black" : "none")};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`