export default interface IUser {
    reservations?(reservations: any): unknown;
    name: string;
    lastName: string;
    // birthdate: string;
    phone: number | string;
    email: string;
    id: string;
    profileImgUrl?: string;
    registeredAt?: string;
    active?: boolean;
    nationality?: string;
    dni?: number;
    DOB?:string,
    civilStatus: string;
    photo?: string;
    employmentStatus: string;
    role?: string;
    isActive: string;
  }