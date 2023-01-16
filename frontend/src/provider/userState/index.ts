/* eslint no-use-before-define: 2 */ // --> ON
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IGeolocation {
  latitude: string;
  longitude: string;
}

export interface IAddress {
  publicPlace: string;
  number: number;
  city: string;
  zipCode: string;
  country: string;
  geolocation: IGeolocation;
}

export interface IUser {
  name?: string;
  weight?: number;
  address?: IAddress;
  addressString?: string;
  lat?: string;
  lng?: string;
}

interface AddressState {
  user?: IUser;
  setUser: (values: IUser) => void;
  getUser: () => IUser;
}

const handleFactoryObj = (address: any, lat: string, lng: string) => {
  let publicPlace: string,
    districtWithNumber: string,
    city: string,
    zipCode: string,
    country: string,
    number: string,
    district: string;
  [publicPlace, districtWithNumber, city, zipCode, country] =
    address?.split(",");

  [number, district] = districtWithNumber?.split("-");

  return {
    zipCode,
    city,
    number: Number(number),
    publicPlace,
    country,
    district,
    geolocation: {
      latitude: lat,
      longitude: lng,
    },
  } as IAddress;
};

export const useUserStore = create<AddressState>()(
  persist(
    (set, get) => ({
      setUser(values) {
        let newObjUser = {};
        const { address, name, weight, lat, lng } = values;
        const oldUser = get().user;

        if (name || weight) {
          newObjUser = { ...oldUser, name, weight: Number(weight) };
        }

        if (address && lat && lng) {
          newObjUser = {
            ...oldUser,
            address: handleFactoryObj(values.address, lat, lng),
            addressString: address,
          };
        }
        set({
          user: { ...newObjUser },
        });
      },
      getUser() {
        return get().user;
      },
    }),
    {
      name: "user-storage",
    }
  )
);

export const initialAddressState = useUserStore.getState();
