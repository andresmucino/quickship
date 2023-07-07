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

const ShipmentsQuery = gql`
  query getShipments {
    shipments {
      nodes {
        id
        shipmentStatus {
          id
          status
        }
        warehouseShipment {
          id
          client {
            id
          }
        }
        packages {
          nodes {
            id
            guide
          }
        }
        messenger {
          id
        }
        updatedAt
      }
    }
  }
`;

const graphQLClient = new GraphQLClient(`${API_URL}/graphql`);

const fetchShipments = async () => {
  return await graphQLClient.request(ShipmentsQuery);
};

export default function Shipments() {
  const { data, isLoading, error }: any = useQuery({
    queryKey: ["getShipments"],
    queryFn: fetchShipments,
  });

  const columns: Array<EuiBasicTableColumn<any>> = [
    {
      field: "id",
      name: "ID",
    },
    {
      field: "packages.nodes.length",
      name: "Paradas",
    },
    {
      field: "updatedAt",
      name: "Actualizada",
    },
    {
      field: "shipmentStatus.status",
      name: "Estatus",
    },
    {
      field: "null",
      name: "Acciones",
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
          <Header title={`Ordenes (${data?.shipments?.nodes.length})`}>
            {/* <EuiButton onClick={() => "/"} href="/">
                    Crear cliente
                  </EuiButton> */}
          </Header>
          <EuiHorizontalRule />
          <EuiPanel>
            <Table items={data?.shipments.nodes} columns={columns} />
          </EuiPanel>
        </EuiPanel>
      )}
    </EuiPageHeaderContent>
  );
}
