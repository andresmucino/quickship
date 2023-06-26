"use client";

import { API_URL } from "@/common";
import { Header, Table } from "@/components";
import {
  EuiBasicTableColumn,
  EuiHorizontalRule,
  EuiPageHeader,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSkeletonText,
} from "@elastic/eui";
import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";

const ClientsQuery = gql`
  query getOrders {
    orders {
      id
      price
      clientId
      directionId
      createAt
    }
  }
`;

const graphQLClient = new GraphQLClient(`${API_URL}/graphql`);

const fetchOrders = async () => {
  return await graphQLClient.request(ClientsQuery);
};

export default function Orders() {
  const { data, isLoading, error }: any = useQuery({
    queryKey: ["getOrders"],
    queryFn: fetchOrders,
  });

  const columns: Array<EuiBasicTableColumn<any>> = [
    {
      field: "id",
      name: "ID",
    },
    {
      field: "createAt",
      name: "Creada",
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
          <Header title={`Ordenes (${data?.orders.length})`}>
            {/* <EuiButton onClick={() => "/"} href="/">
                    Crear cliente
                  </EuiButton> */}
          </Header>
          <EuiHorizontalRule />
          <EuiPanel>
            <Table items={data?.orders} columns={columns} />
          </EuiPanel>
        </EuiPanel>
      )}
    </EuiPageHeaderContent>
  );
}
