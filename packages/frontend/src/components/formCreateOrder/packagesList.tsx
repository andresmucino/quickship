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
  street: string;
  externalNumber: string;
  internalNumber: string;
  neigthboorhood: string;
  municipality: string;
  state: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
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
                            {pack.street} {pack.externalNumber},{" "}
                            {pack.internalNumber}, {pack.neigthboorhood},{" "}
                            {pack.municipality}, {pack.state}
                          </div>
                        </EuiText>
                        <EuiSpacer />
                        <EuiText>
                          <div>
                            <h4>Contacto:</h4> {pack.firstName} {pack.lastName},{" "}
                            {pack.email}, {pack.phone}
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
