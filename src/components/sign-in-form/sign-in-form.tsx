import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import Button from "../button/button.componnet";
import FormInput from "../form-input/form-input.component";

import { BUTTON_TYPE_CLASSES } from "../button/button.componnet";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

import { SignInFormContainer, ButtonsContainer } from "./sign-in-form.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(emailSignInStart(email, password));
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) { 
      setFormFields({
        ...formFields,
        [event.target.name]: event.target.value,
      })
    }
  };

  return (
    <SignInFormContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          required
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInFormContainer>
  );
}
