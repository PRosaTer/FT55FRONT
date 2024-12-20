import { user } from "@/helpers/data";
import { IAmenities } from "./IAmenities";
import IUser from "./user";
import { IAccount } from "./IAccount";

export interface IProperty {
  id: number;
  account_: IAccount;
  isActive: boolean;
  name: string;
  description: string;

  state: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  isAvailable: boolean;
  capacity: number;
  photos?: string[];
  image_?: { id: string; url: string }[];
  rating: number;
  hasMinor: boolean;
  pets: boolean
  amenities: IAmenities
}

export interface IPropertyList {
  properties: IProperty[];
}
