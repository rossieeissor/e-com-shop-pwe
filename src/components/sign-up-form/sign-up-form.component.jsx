import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.componnet";

import {
  createUserDocumentFromAuth,
  createNewUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.log("passwords do not match");
      return;
    }

    try {
      const { user } = await createNewUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, {
        displayName,
      });
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("email already in use");
      } else if (error.code === "auth/weak-password") {
        alert("password is too weak");
      } else {
        console.log("something wrong with creating new user:", error);
      }
    }
  };

  const handleChange = event => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          name="displayName"
          type="text"
          value={displayName}
          onChange={handleChange}
          required
        />

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

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
          required
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
