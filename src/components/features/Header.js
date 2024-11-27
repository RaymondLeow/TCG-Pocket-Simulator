import HeaderImage from "../../images/title-logo.png";
import styled from "styled-components";

const Image = styled.img`
  max-height: 100px;
`;

const HeaderContainer = styled.header`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <Image src={HeaderImage} alt="Title" />
    </HeaderContainer>
  );
};

export default Header;
