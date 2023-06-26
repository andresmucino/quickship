"use client";

import { options } from "@/components/formCreateOrder/createPackages";
import { PackageDataProps } from "@/components/formCreateOrder/packagesList";
import { createContext, useEffect, useState } from "react";

export type CreateOrderContextType = {
  loading: boolean;
  packagesData: Array<PackageDataProps>;
  setPackagesData: React.Dispatch<
    React.SetStateAction<Array<PackageDataProps>>
  >;
  createPackage: (
    id: string,
    street: string,
    externalNumber: string,
    internalNumber: string,
    neigthboorhood: string,
    municipality: string,
    state: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string
  ) => void;
  deletePackage: (id: string) => void;
  updatePackage: (id: string, updatedPackage: PackageDataProps) => void;
  selectOption: string;
  onChangeSelect: (value: string) => void
};

export const CreateOrderContext = createContext<CreateOrderContextType>(null!);

interface Props {
  children: JSX.Element;
}

export const CreateOrderProvider: React.FC<Props> = ({ children }) => {
  const [packagesData, setPackagesData] = useState<Array<PackageDataProps>>([]);
  const loading = false;

  useEffect(() => {
    const pack = localStorage.getItem("packagesData") as string;
    const result = JSON.parse(pack);
    if (result.length > 0) {
      setPackagesData(result);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("packagesData", JSON.stringify(packagesData));
  }, [packagesData]);

  const createPackage = (
    id: string,
    street: string,
    externalNumber: string,
    internalNumber: string,
    neigthboorhood: string,
    municipality: string,
    state: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string
  ) => {
    setPackagesData([
      ...packagesData,
      {
        id,
        street,
        externalNumber,
        internalNumber,
        neigthboorhood,
        municipality,
        state,
        firstName,
        lastName,
        phone,
        email,
      },
    ]);
  };

  const updatePackage = (id: string, updatedPackage: PackageDataProps) => {
    setPackagesData([
      ...packagesData.map((pack) =>
        pack.id === id ? { ...pack, ...updatedPackage } : pack
      ),
    ]);
  };

  const deletePackage = (id: string) => {
    setPackagesData([...packagesData.filter((pack) => pack.id !== id)]);
  };

    const [selectOption, setSelectOption] = useState<any>(options[1].value);

    const onChangeSelect = (value: any) => {  
      setSelectOption(value);
    };


  return (
    <CreateOrderContext.Provider
      value={{
        loading,
        createPackage,
        packagesData,
        setPackagesData,
        deletePackage,
        updatePackage,
        onChangeSelect,
        selectOption
      }}
    >
      {children}
    </CreateOrderContext.Provider>
  );
};
