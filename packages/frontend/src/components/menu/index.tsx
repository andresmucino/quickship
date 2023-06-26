import {
  EuiHorizontalRule,
  EuiListGroup,
  EuiListGroupItem,
} from "@elastic/eui";

export const Menu = () => {
  return (
    <EuiListGroup>
      <EuiListGroupItem
        iconType="home"
        label="Home"
        onClick={() => "/"}
        isActive
        href="/"
      />
      <EuiHorizontalRule />
      <EuiListGroupItem
        iconType="users"
        onClick={() => "/clients"}
        label="Clientes"
        href="/clients"
      />
      <EuiHorizontalRule />
      <EuiListGroupItem
        iconType="visMapRegion"
        iconProps={{ color: "default" }}
        onClick={() => "/createOrder"}
        label="Crear Orden"
        href="/createOrder"
      />
      <EuiHorizontalRule />
      <EuiListGroupItem
        iconType="dotInCircle"
        label="Ordenes"
        onClick={() => "/orders"}
        href="/orders"
      />
      <EuiHorizontalRule />
      <EuiListGroupItem
        onClick={() => "/messengers"}
        iconType="dotInCircle"
        label="Mensajeros"
        href="/messengers"
      />
    </EuiListGroup>
  );
};
