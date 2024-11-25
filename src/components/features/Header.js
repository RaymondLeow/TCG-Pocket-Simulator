import tw from "twin.macro";
import HeaderImage from "../../images/title-logo.png";

const Image = tw.img`max-w-[300px] h-auto`;
const HeaderContainer = tw.header`flex justify-center items-center w-full`;

export const Header = () => {
  return (
    <HeaderContainer>
      <Image src={HeaderImage} alt="Title" />
    </HeaderContainer>
  );
};

export default Header;
