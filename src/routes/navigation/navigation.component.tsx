import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import crwnLogo from "../../assets/Logo.png";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutstart } from "../../store/user/user.reducer";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  Navlink,
  DisplayName,
} from "./navigation.styles";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOutstart());
  };

  return (
    <>
      <header>
        <NavigationContainer>
          <LogoContainer to="/">
            <img src={crwnLogo} alt="easy logo" />
          </LogoContainer>
          {currentUser && (
            <DisplayName>Hello, {currentUser.displayName}! </DisplayName>
          )}
          <NavLinks>
          <li><Navlink to="/shop">SHOP</Navlink></li>
            {currentUser ? (
              <li><Navlink as="span" onClick={signOutHandler}>SIGN OUT</Navlink></li>
            ) : (
              <li><Navlink to="/auth">SIGN IN</Navlink></li>
            )}
            <li><CartIcon /></li>
          </NavLinks>
          {isCartOpen && <CartDropdown />}
        </NavigationContainer>
      </header>
      <main>
        <Outlet />
      </main>
    </>
    
  );
};

export default Navigation;
