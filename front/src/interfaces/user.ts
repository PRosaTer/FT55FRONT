export default interface IUser {
    reservations(reservations: any): unknown;
    name: string;
    lastName: string;
    DOB: string;
    phone: string;
    email: string;
    nationality: string;
    dni:string;
    id: string;
    profileImgUrl: string;
    registeredAt: string;
    active: boolean;
  }