"use client";

import { API_URL, CreateClientType } from "@/common";
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

const CreateClientQuery = gql`
  mutation createClient($input: ClientInput!) {
    createClient(createClient: $input) {
      id
    }
  }
`;

const graphQLClient = new GraphQLClient(`${API_URL}/graphql`);

export default function CreateClient() {
  const mutation = useMutation({
    mutationKey: ["createClient"],
    mutationFn: (client: CreateClientType) => {
      return graphQLClient.request(CreateClientQuery, client);
    },
  });
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    mutation.mutate({ input: data });
  };

  if (mutation.isLoading) return <p>loading</p>;

  return (
    <EuiPageHeaderContent>
      <EuiPanel style={{ margin: "2vh" }}>
        <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
          <Header title={`Crear cliente`}>
            <EuiButton
              fill
              type="submit"
              onClick={() => "/clients"}
              href="/clients"
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
