import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHorizontalRule,
  EuiPanel,
  EuiText,
} from "@elastic/eui";
import { useState } from "react";

export interface FormCreateOrderProps {
  setValue: (name: string, value: string) => void;
  register: any;
  error: any;
}

export const FormCreateOrder: React.FC<FormCreateOrderProps> = ({
  setValue,
  error,
  register,
}) => {
  const [inputValue, setInputValue] = useState({
    street: "",
    neigthboorhood: "",
    municipality: "",
    state: "",
    externalNumber: 0,
    internalNumber: 0,
    zipCode: "",
    latitude: 0,
    longitude: 0,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setValue(name, value);
  };

  return (
    <EuiFlexItem>
      <EuiPanel>
        <EuiText>
          <p>Dirección de recolección</p>
        </EuiText>
        <EuiHorizontalRule />
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow id="1">
              <EuiFieldText
                name="street"
                placeholder="Calle"
                onChange={handleChange}
                //   inputRef={register("", {
                //     required: inputValue.street === "",
                //   })}
              />
            </EuiFormRow>
            <EuiFormRow id="2">
              <EuiFieldText
                name="neigthboorhood"
                placeholder="Colonia"
                onChange={handleChange}
                //   inputRef={register("", { required: inputValue.neigthboorhood === "" })}
              />
            </EuiFormRow>
            <EuiFormRow id="3">
              <EuiFieldText
                name="municipality"
                placeholder="Alcaldia"
                onChange={handleChange}
                //   inputRef={register("", { required: inputValue.municipality === "" })}
              />
            </EuiFormRow>
            <EuiFormRow id="4">
              <EuiFieldText
                name="state"
                placeholder="Ciudad"
                onChange={handleChange}
                //   inputRef={register("", { required: inputValue.state === "" })}
              />
            </EuiFormRow>
            <EuiFormRow id="5">
              <EuiFieldText
                name="zipCode"
                placeholder="Codigo postal"
                onChange={handleChange}
                //   inputRef={register("", { required: inputValue.state === "" })}
              />
            </EuiFormRow>
            <EuiFormRow id="6">
              <EuiFieldText
                name="externalNumber"
                placeholder="numero exterior"
                onChange={handleChange}
                //   inputRef={register()}
              />
            </EuiFormRow>
            <EuiFormRow id="7">
              <EuiFieldText
              type='int'
                name="internalNumber"
                placeholder="numero interior"
                onChange={handleChange}
                //   inputRef={register()}
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </EuiFlexItem>
  );
};
