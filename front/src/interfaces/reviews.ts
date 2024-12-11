import IUser from "./user";
import { IPropiedad } from "./properties";
export interface IReview {
    userId: any;
    id: string;         
    user: IUser;    
    property: IPropiedad;  
    reviewDate: string;   
    comment: string;     
    rating: number;       
  }