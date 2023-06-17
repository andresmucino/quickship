import { EuiListGroup, EuiListGroupItem } from "@elastic/eui";

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

      <EuiListGroupItem
        iconType="visualizeApp"
        onClick={() => "/clients"}
        label="Clientes"
        href="/clients"
      />

      <EuiListGroupItem
        iconType="lensApp"
        iconProps={{ color: "default" }}
        onClick={() => "/createOrders"}
        label="Crear Ordenes"
        href="/createOrders"
      />

      <EuiListGroupItem
        iconType="brush"
        label="Ordenes"
        onClick={() => "/orders"}
        href="/orders"
      />

      <EuiListGroupItem
        onClick={() => "/messengers"}
        iconType="broom"
        label="Mensajeros"
        href="/messengers"
      />
    </EuiListGroup>
  );
};
