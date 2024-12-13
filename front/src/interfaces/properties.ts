import IUser from "./user";
import { IReview } from "./reviews";
import { IReservationDetail } from "./reservationDetail";
export interface IPropiedad {
  id: number;
  owner: IUser;
  active: boolean;
  title: string;
  description: string;

  state?: string;        
  city?: string;            
  price?: number[];          
  bedrooms?: number[];       
  bathrooms: number;
  isAvailable: boolean;
  capacity?: number;         
  photos: string[];
  stripeProductId: string;
  stripePriceId: string;
  reviews: IReview[];
  reservationDetail: IReservationDetail;
  latitude: any;
  longitude: any;
}