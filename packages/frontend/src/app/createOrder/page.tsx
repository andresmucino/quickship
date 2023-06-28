"use client";

import { API_URL } from "@/common";
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
  EuiPageHeader,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSkeletonText,
  EuiSpacer,
} from "@elastic/eui";
import { useMutation } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreateOrderQuery = gql`
  mutation createOrder($input: orderInput!) {
    createOrder(createOrderInput: $input) {
      id
    }
  }
`;

const graphqlQLClient = new GraphQLClient(`${API_URL}/graphql`);

export default function CreateOrder() {
  const mutation = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: (createOrder: any) => {
      return graphqlQLClient.request(CreateOrderQuery, createOrder);
    },
  });
  const [addPackage, setAddPackage] = useState({
    id: "",
    // direction: {
    //   street: "",
    //   externalNumber: "",
    //   internalNumber: "",
    //   neigthboorhood: "",
    //   municipality: "",
    //   state: "",
    //   zipCode: "",
    // },
    // contact: { firstName: "", lastName: "", phone: "", email: "" },
    weigth: 0,
    width: 0,
    heigth: 0,
    length: 0,
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

  let valueSelectOption: any = {};

  switch (selectOption) {
    case "envelope":
      valueSelectOption = {
        weigth: 0.30,
        width: 10,
        heigth: 10,
        length: 10,
      };
      break;
    case "box_small":
      valueSelectOption = {
        weigth: 10,
        width: 40,
        heigth: 30,
        length: 25,
      };
    case "box_medium":
      valueSelectOption = {
        weigth: 15,
        width: 30,
        heigth: 40,
        length: 30,
      };
      break;

    case "box_big":
      valueSelectOption = {
        weigth: 25,
        width: 40,
        heigth: 50,
        length: 40,
      };
      break;
    default:
      "no se asignaron medidas de paquetes";
  }

  useEffect(() => {
    if (idPackage) {
      const foundPackage = packagesData.find((pack) => pack.id === idPackage);

      if (foundPackage) {
        setAddPackage({
          id: foundPackage.id,
          // direction: {
          //   street: foundPackage.direction.street,
          //   externalNumber: foundPackage.direction.externalNumber,
          //   internalNumber: foundPackage.direction.internalNumber,
          //   neigthboorhood: foundPackage.direction.neigthboorhood,
          //   municipality: foundPackage.direction.municipality,
          //   state: foundPackage.direction.state,
          //   zipCode: foundPackage.direction.zipCode,
          // },
          // contact: {
          //   firstName: foundPackage.contact.firstName,
          //   lastName: foundPackage.contact.lastName,
          //   phone: foundPackage.contact.phone,
          //   email: foundPackage.contact.email,
          // },
          weigth: valueSelectOption.weigth,
          width: valueSelectOption.width,
          heigth: valueSelectOption.heigth,
          length: valueSelectOption.length,
        });
      }
    }
  }, []);

  const onSubmitPackage = (e: any) => {
    e.preventDefault();
    createPackage(
      (addPackage.id = `${packagesData.length + 1}`),
      // addPackage.direction,
      // addPackage.contact,
      valueSelectOption.width,
      valueSelectOption.weigth,
      valueSelectOption.heigth,
      valueSelectOption.length
    );
  };

  const onSubmit = (data: any) => {
    // const [destructurePackagesData] = packagesData;
    const dataArguments = {
      comments: "no hay comentarios",
      price: 15,
      clientId: 1,
      direction: {
        street: data.street,
        externalNumber: Number(data.externalNumber),
        internalNumber: Number(data.internalNumber),
        neigthboorhood: data.neigthboorhood,
        municipality: data.municipality,
        state: data.state,
        zipCode: data.zipCode,
      },
      packges: packagesData,
    };
    mutation.mutate({ input: dataArguments });
    console.log(data, packagesData, "packagesguard");
  };

  // console.log(packagesData, valueSelectOption);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <>
        <EuiPanel style={{ margin: "2vh" }}>
          <EuiPageHeader>
            <EuiSkeletonText
              lines={1}
              size={"relative"}
              // isLoading={isLoading}
            ></EuiSkeletonText>
          </EuiPageHeader>
          <EuiSkeletonText
            lines={6}
            size={"m"}
            // isLoading={isLoading}
          ></EuiSkeletonText>
        </EuiPanel>
      </>
    );

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
