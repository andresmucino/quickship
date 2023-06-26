"use client";

import { FormCreateOrder, Header } from "@/components";
import { CreatePackages } from "@/components/formCreateOrder/createPackages";
import { PackagesList } from "@/components/formCreateOrder/packagesList";
import { useCreateOrderContext } from "@/hooks";
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSpacer,
} from "@elastic/eui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateOrder() {
  const [addPackage, setAddPackage] = useState({
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

  const [idPackage, setIdPackage] = useState("");

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const {
    createPackage,
    packagesData,
    deletePackage,
    selectOption,
    onChangeSelect,
  } = useCreateOrderContext();

  useEffect(() => {
    if (idPackage) {
      const foundPackage = packagesData.find((pack) => pack.id === idPackage);

      if (foundPackage) {
        setAddPackage({
          id: foundPackage.id,
          street: foundPackage.street,
          externalNumber: foundPackage.externalNumber,
          internalNumber: foundPackage.internalNumber,
          neigthboorhood: foundPackage.neigthboorhood,
          municipality: foundPackage.municipality,
          state: foundPackage.state,
          firstName: foundPackage.firstName,
          lastName: foundPackage.lastName,
          phone: foundPackage.phone,
          email: foundPackage.email,
        });
      }
    }
  }, []);

  const onSubmitPackage = (e: any) => {
    e.preventDefault();
    createPackage(
      (addPackage.id = `${packagesData.length + 1}`),
      addPackage.street,
      addPackage.externalNumber,
      addPackage.internalNumber,
      addPackage.neigthboorhood,
      addPackage.municipality,
      addPackage.state,
      addPackage.firstName,
      addPackage.lastName,
      addPackage.phone,
      addPackage.email
    );
  };

  let valueSelectOption = {};

  switch (selectOption) {
    case "envelope":
      valueSelectOption = {
        weigth: "0.30",
        width: "1",
        heigth: "1",
        legth: "1",
      };
      break;
    case "box_small":
      valueSelectOption = {
        weigth: "1",
        width: "40",
        heigth: "30",
        legth: "25",
      };
    case "box_medium":
      valueSelectOption = {
        weigth: "15",
        width: "30",
        heigth: "40",
        legth: "30",
      };
      break;

    case "box_big":
      valueSelectOption = {
        weigth: "25",
        width: "40",
        heigth: "50",
        legth: "40",
      };
      break;
    default:
      "no se asignaron medidas de paquetes";
  }

  const onSubmit = (data: any) => {
    console.log(data, packagesData, valueSelectOption, "packagesguard");
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>Error</>;

  return (
    <EuiPageHeaderContent>
      <EuiPanel style={{ margin: "2vh" }}>
        <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
          <Header title={`Crear Orden`}>
            <EuiButton
              fill
              type="submit"
              // onClick={() => "/orders"}
              // href="/orders"
            >
              Guardar
            </EuiButton>
          </Header>
          <EuiHorizontalRule />
          <EuiPanel>
            <EuiSpacer />
            <EuiFlexGroup>
              <EuiFlexItem>
                <FormCreateOrder
                  setValue={setValue}
                  register={register}
                  error={errors}
                />
              </EuiFlexItem>
              <EuiFlexItem>
                {
                  <CreatePackages
                    addPackage={addPackage}
                    setAddPackage={setAddPackage}
                    onSubmit={onSubmitPackage}
                    titleButton={"Agregar paquete"}
                    selectOption={selectOption}
                    onChangeSelect={onChangeSelect}
                  />
                }
              </EuiFlexItem>
              <EuiFlexItem>
                <PackagesList
                  packagesData={packagesData}
                  onClickDeletePackage={deletePackage}
                  // onClickEdit={() => setIsLoading(true)}
                  // setPackagesId={setIdPackage}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiForm>
      </EuiPanel>
    </EuiPageHeaderContent>
  );
}
