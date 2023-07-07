"use client";
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPanel,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";

export interface PackagesListProps {
  packagesData: Array<PackageDataProps>;
  onClickDeletePackage: (id: string) => void;
  // onClickEdit: () => void;
  // setPackagesId: (id: string) => void;
}

export interface PackageDataProps {
  id: string;
  weigth: number;
  width: number;
  heigth: number;
  length: number;
}

export interface ContactPackagesData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface DirectionPackagesData {
  street: string;
  externalNumber: string;
  internalNumber: string;
  neigthboorhood: string;
  municipality: string;
  state: string;
  zipCode: string;
}

export const PackagesList: React.FC<PackagesListProps> = ({
  packagesData,
  onClickDeletePackage,
  // onClickEdit,
  // setPackagesId,
}) => {
  return (
    <>
      <EuiPanel>
        <EuiText>
          <p>Listado de paquetes</p>
        </EuiText>
        <EuiHorizontalRule />
        <div
          style={{
            height: "400px",
            overflowY: "scroll",
            paddingRight: "10px",
            paddingLeft: "10px",
            backgroundColor: "#0077cc1a",
          }}
        >
          <EuiFlexGroup>
            <EuiFlexItem style={{ marginTop: "1vh" }}>
              {packagesData.length === 0 ? (
                <div>
                  <EuiPanel>
                    <EuiText>
                      <p>
                        Los paquetes agregados los encontraras en esta lista
                      </p>
                    </EuiText>
                  </EuiPanel>
                </div>
              ) : (
                <>
                  {packagesData.map((pack) => (
                    <div key={pack.id}>
                      <EuiPanel>
                        <EuiText>
                          <div>
                            <h4>Dirección:</h4>
                            {/* {pack.direction.street}{" "}
                            {pack.direction.externalNumber},{" "}
                            {pack.direction.internalNumber},{" "}
                            {pack.direction.neigthboorhood},{" "}
                            {pack.direction.municipality},{" "}
                            {pack.direction.state}, {pack.direction.zipCode} */}
                          </div>
                        </EuiText>
                        <EuiSpacer />
                        <EuiText>
                          <div>
                            <h4>Contacto:</h4>
                            {/* {pack.contact.firstName} {pack.contact.lastName},{" "}
                            {pack.contact.email}, {pack.contact.phone} */}
                          </div>
                        </EuiText>
                        <EuiHorizontalRule />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          {/* <EuiButton
                            onClick={() => {
                              onClickEdit();
                              setPackagesId(pack.id);
                            }}
                          >
                            Editar
                          </EuiButton> */}

                          <EuiButton
                            onClick={() => {
                              onClickDeletePackage(pack.id);
                            }}
                          >
                            Eliminar
                          </EuiButton>
                        </div>
                      </EuiPanel>
                      <EuiSpacer />
                    </div>
                  ))}
                </>
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </EuiPanel>
    </>
  );
};
