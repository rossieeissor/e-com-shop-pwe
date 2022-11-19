import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithGooglePopup,
  signInWithUserEmailandPassword,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.componnet";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // let navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await signInWithUserEmailandPassword(email, password);
      setFormFields(defaultFormFields);
      // navigate("/shop");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("email not found");
      } else if (error.code === "auth/wrong-password") {
        alert("wrong password");
      } else {
        alert("something goes wrong");
        console.log("something wrong with login", error);
      }
    }
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleChange = event => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="sign-in-form-container">
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
