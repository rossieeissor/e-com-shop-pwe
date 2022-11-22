import { Group, FormInputStyle } from "./form-input.styles";

export default function FormInput({ label, ...otherProps }) {
  return (
    <Group>
      <FormInputStyle {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </Group>
  );
}
