import {
  EuiButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
} from "@elastic/eui";
import React, { useState } from "react";

export interface GeneralFormProps {
  register: any;
  setValue: (name: string, value: string) => void;
  //   onChange: (e: any) => void;
  errors: any;
}
export const GeneralForm: React.FC<GeneralFormProps> = ({
  errors,
  //   onChange,
  register,
  setValue,
}) => {
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setValue(name, value);
  };
  return (
    <EuiFlexGroup >
      <EuiFlexItem>
        <EuiFormRow id="1">
          <EuiFieldText
            name="firstName"
            placeholder="Nombre"
            onChange={handleChange}
            inputRef={register("", { required: inputValue.firstName === "" })}
          />
        </EuiFormRow>
        <EuiFormRow id="2">
          <EuiFieldText
            name="lastName"
            placeholder="Apellido"
            onChange={handleChange}
            inputRef={register("", { required: inputValue.lastName === "" })}
          />
        </EuiFormRow>
        <EuiFormRow id="3">
          <EuiFieldText
            name="phone"
            placeholder="Numero"
            onChange={handleChange}
            inputRef={register("", { required: inputValue.phone === "" })}
          />
        </EuiFormRow>
        <EuiFormRow id="4">
          <EuiFieldText
            name="email"
            placeholder="Correo"
            onChange={handleChange}
            inputRef={register("", { required: inputValue.email === "" })}
          />
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
