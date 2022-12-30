import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import crwnLogo from "../../assets/Logo.png";

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  @media screen and (max-width: 800px) {
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
    }
`;

export const Logo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 70px;
  background: url(${crwnLogo});
  background-size: 100% 100%;

  @media screen and (max-width: 800px) {
    width: 40px;
  }
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Navlink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

export const DisplayName = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 18px;
  padding: 10px 0 10px 10px;
  
  @media screen and (max-width: 800px) {
    
  }
`;
