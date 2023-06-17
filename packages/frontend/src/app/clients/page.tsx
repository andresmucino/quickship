"use client";

import { API_URL } from "@/common";
import { Table } from "@/components";
import {
  EuiBasicTableColumn,
  EuiHorizontalRule,
  EuiPageHeader,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSkeletonText,
  EuiText,
} from "@elastic/eui";
import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";

const UserQuery = gql`
  query getUser {
    clients {
      id
      firstName
      lastName
    }
  }
`;

const graphQLClient = new GraphQLClient(`${API_URL}/graphql`);

const fetchUser = async () => {
  return await graphQLClient.request(UserQuery);
};

export default function Clients() {
  const { isLoading, error, data, isFetching }: any = useQuery({
    queryKey: ["clients"],
    queryFn: fetchUser,
  });

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
          <EuiPageHeader>
            <EuiText>
              <h1>{`Clientes (${data?.clients.length})`}</h1>
            </EuiText>
          </EuiPageHeader>
          <EuiHorizontalRule />
          <EuiPanel>
            <Table items={data?.clients} columns={columns} />
          </EuiPanel>
        </EuiPanel>
      )}
    </EuiPageHeaderContent>
  );
}
