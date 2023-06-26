"use client";

import {
  EuiButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiHorizontalRule,
  EuiPanel,
  EuiSpacer,
  EuiSuperSelect,
  EuiText,
} from "@elastic/eui";
import { Fragment } from "react";
import { PackageDataProps } from "./packagesList";

export const options = [
  {
    value: "envelope",
    inputDisplay: "Sobre",
    dropdownDisplay: (
      <Fragment>
        <strong>Sobre</strong>
        <EuiText size="s" color="subdued">
          <p>
            Mensajero con mochila, solo envios de documentos, llaves, libros,
            etc.
          </p>
        </EuiText>
      </Fragment>
    ),
  },
  {
    value: "box_small",
    inputDisplay: "Caja chica",
    dropdownDisplay: (
      <Fragment>
        <strong>Caja chica</strong>
        <EuiText size="s" color="subdued">
          <p>Maximo: 40 L x 30 An x 25 Al cm, peso 1 kg</p>
        </EuiText>
      </Fragment>
    ),
  },
  {
    value: "box_medium",
    inputDisplay: "Caja mediana",
    dropdownDisplay: (
      <Fragment>
        <strong>Caja mediana</strong>
        <EuiText size="s" color="subdued">
          <p>Maximo: 30 L x 40 An x 30 Al, peso hasta 15 kg</p>
        </EuiText>
      </Fragment>
    ),
  },
  {
    value: "box_big",
    inputDisplay: "Caja grande",
    dropdownDisplay: (
      <Fragment>
        <strong>Caja grande</strong>
        <EuiText size="s" color="subdued">
          <p>Maximo: 40 L x 50 An x 40 Al, peso hasta 25 kg</p>
        </EuiText>
      </Fragment>
    ),
  },
];

export interface CreatePackagesProps {
  addPackage: PackageDataProps;
  setAddPackage: React.Dispatch<React.SetStateAction<PackageDataProps>>;
  onSubmit: (e: any) => void;
  titleButton: string;
  selectOption: string;
  onChangeSelect: (value: string) => void;
}

export const CreatePackages: React.FC<CreatePackagesProps> = ({
  addPackage,
  setAddPackage,
  onSubmit,
  titleButton,
  selectOption,
  onChangeSelect,
}) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setAddPackage({ ...addPackage, [name]: value });
  };

  return (
    <>
      <EuiPanel>
        <EuiForm component="form">
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <EuiText>
              <p>Direccion de entrega</p>
            </EuiText>
            <EuiText>
              <p>Datos contacto</p>
            </EuiText>
          </div>
          <EuiHorizontalRule />

          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiFormRow id="1">
                <EuiFieldText
                  name="street"
                  placeholder="Calle"
                  onChange={handleChange}
                  value={addPackage.street}
                />
              </EuiFormRow>
              <EuiFormRow id="2">
                <EuiFieldText
                  name="neigthboorhood"
                  placeholder="Colonia"
                  onChange={handleChange}
                  value={addPackage.neigthboorhood}
                />
              </EuiFormRow>
              <EuiFormRow id="3">
                <EuiFieldText
                  name="municipality"
                  placeholder="Alcaldia"
                  onChange={handleChange}
                  value={addPackage.municipality}
                />
              </EuiFormRow>
              <EuiFormRow id="4">
                <EuiFieldText
                  name="state"
                  placeholder="Ciudad"
                  onChange={handleChange}
                  value={addPackage.state}
                />
              </EuiFormRow>
              <EuiFormRow id="5">
                <EuiFieldText
                  name="externalNumber"
                  placeholder="numero exterior"
                  onChange={handleChange}
                  value={addPackage.externalNumber}
                />
              </EuiFormRow>
              <EuiFormRow id="6">
                <EuiFieldText
                  name="internalNumber"
                  placeholder="numero interior"
                  onChange={handleChange}
                  value={addPackage.internalNumber}
                />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow id="1">
                <EuiFieldText
                  name="firstName"
                  placeholder="Nombre de contacto"
                  onChange={handleChange}
                  value={addPackage.firstName}
                />
              </EuiFormRow>
              <EuiFormRow id="2">
                <EuiFieldText
                  name="lastName"
                  placeholder="apellido de contacto"
                  onChange={handleChange}
                  value={addPackage.lastName}
                />
              </EuiFormRow>
              <EuiFormRow id="3">
                <EuiFieldText
                  name="phone"
                  placeholder="telefono contacto"
                  onChange={handleChange}
                  value={addPackage.phone}
                />
              </EuiFormRow>
              <EuiFormRow id="4">
                <EuiFieldText
                  name="email"
                  placeholder="Correo contacto"
                  onChange={handleChange}
                  value={addPackage.email}
                />
              </EuiFormRow>
              <EuiFormRow>
                <EuiSuperSelect
                  options={options}
                  valueOfSelected={selectOption}
                  placeholder="Selecciona tipo de paquete"
                  onChange={(value) => onChangeSelect(value)}
                  itemLayoutAlign="top"
                  hasDividers
                />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <EuiButton
              fill
              size="m"
              onClick={(e: any) => {
                onSubmit(e);
                onChangeSelect("");
                setAddPackage({
                  id: "",
                  street: "",
                  externalNumber: "",
                  internalNumber: "",
                  neigthboorhood: "",
                  municipality: "",
                  state: "",
                  firstName: "",
                  lastName: "",
                  phone: "",
                  email: "",
                });
              }}
            >
              {titleButton}
            </EuiButton>
          </div>
        </EuiForm>
      </EuiPanel>
    </>
  );
};
