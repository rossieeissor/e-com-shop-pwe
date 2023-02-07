import styled from "styled-components/macro";
import { Link } from "react-router-dom";

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

export const LogoContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 70px;

  img {
    object-fit: contain;
    width: 100%;
  }

  @media screen and (max-width: 800px) {
    width: 40px;
  }
`;

export const NavLinks = styled.ul`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
  margin: 0;
  padding: 0;

   li {
    padding: 10px 15px;
    cursor: pointer;
    text-align: center;
   }

  @media screen and (max-width: 500px) {
   width: unset;
  }
`;

export const Navlink = styled(Link)`
  
`;

export const DisplayName = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 18px;
  padding: 10px 0 10px 10px;
  
  
`;
