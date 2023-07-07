"use client";

import { API_URL } from "@/common";
import { ErrorPage, Header, Table } from "@/components";
import {
  EuiBasicTableColumn,
  EuiButton,
  EuiHorizontalRule,
  EuiPageHeader,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSkeletonText,
} from "@elastic/eui";
import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";

const ClientsQuery = gql`
  query getClients {
    clients {
      nodes {
        id
        firstName
        lastName
        phone
        email
      }
    }
  }
`;

const graphQLClient = new GraphQLClient(`${API_URL}/graphql`);

const fetchClients = async () => {
  return await graphQLClient.request(ClientsQuery);
};

export default function Clients() {
  const { isLoading, error, data, isFetching }: any = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  console.log(data)

  const columns: Array<EuiBasicTableColumn<any>> = [
    {
      field: "id",
      name: "ID",
    },
    {
      field: "firstName",
      name: "Nombre",
    },
    {
      field: "lastName",
      name: "Apellido",
    },
    {
      field: "phone",
      name: "Telefono",
    },
    {
      field: "email",
      name: "Correo",
    },
  ];

  return (
    <EuiPageHeaderContent>
      {isLoading ? (
        <EuiPanel style={{ margin: "2vh" }}>
          <EuiPageHeader>
            <EuiSkeletonText
              lines={1}
              size={"relative"}
              isLoading={isLoading}
            ></EuiSkeletonText>
          </EuiPageHeader>
          <EuiSkeletonText
            lines={6}
            size={"m"}
            isLoading={isLoading}
          ></EuiSkeletonText>
        </EuiPanel>
      ) : (
        <EuiPanel style={{ margin: "2vh" }}>
          <Header title={`Clientes (${data?.clients.nodes.length})`}>
            <EuiButton onClick={() => "/createClient"} href="/createClient">
              Crear cliente
            </EuiButton>
          </Header>
          <EuiHorizontalRule />
          <EuiPanel>
            <Table items={data?.clients.nodes} columns={columns} />
          </EuiPanel>
        </EuiPanel>
      )}
      {error && <ErrorPage message="Error al cargar clientes" />}
    </EuiPageHeaderContent>
  );
}
