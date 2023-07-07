"use client";

import { API_URL, CreateMessengerType } from "@/common";
import { GeneralForm, Header } from "@/components";
import {
  EuiButton,
  EuiForm,
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSpacer,
} from "@elastic/eui";
import { useMutation } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";
import { useForm } from "react-hook-form";

const CreateMessengerQuery = gql`
  mutation createMessenger($input: messengerInput!) {
    createMessenger(createMessengerInput: $input) {
      id
    }
  }
`;

const graphQLClient = new GraphQLClient(`${API_URL}/graphql`);

export default function CreateMessenger() {
  const mutation = useMutation({
    mutationKey: ["createMessenger"],
    mutationFn: (messenger: CreateMessengerType) => {
      return graphQLClient.request(CreateMessengerQuery, messenger);
    },
  });

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    const los = mutation.mutate({ input: data });
    console.log(los);
  };

  if (mutation.isLoading) return <p>loading</p>;

  return (
    <EuiPageHeaderContent>
      <EuiPanel style={{ margin: "2vh" }}>
        <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
          <Header title={`Crear Mensajero`}>
            <EuiButton
              fill
              type="submit"
              //   onClick={() => "/messengers"}
              //   href="/messengers"
            >
              Guardar
            </EuiButton>
          </Header>
          <EuiHorizontalRule />
          <EuiPanel>
            <GeneralForm
              register={register}
              setValue={setValue}
              errors={errors}
            />
            <EuiSpacer />
          </EuiPanel>
        </EuiForm>
      </EuiPanel>
    </EuiPageHeaderContent>
  );
}
