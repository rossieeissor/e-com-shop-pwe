import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import SignInForm from "../../components/sign-in-form/sign-in-form";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { selectCurrentUser } from "../../store/user/user.selector";

import { AuthenticationContainer } from "./authentication.styles";

const Authentication = () => {
  const currentUser = useSelector(selectCurrentUser)
  const navigate = useNavigate()

  useEffect(() => {
    if(currentUser) navigate('/')
  }, [currentUser])
  

  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};
export default Authentication;
