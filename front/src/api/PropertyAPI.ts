import { IProperty } from '../interfaces/IProperty';



const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getPropertyDB = async(): Promise<IProperty[]> => {
    try {
        const res = await fetch(`${API_URL}/properties`, {
            next: { revalidate: 1200}
        });
        if (!res.ok) {
            throw new Error(`Fallo al realizar el fetch a Propiedades: ${res.status} ${res.statusText}`);
        }
        const properties: IProperty[] = await res.json();
        return properties;
    } catch (error: any) {
        console.error("Error in getPropertyDB:", error.message || error);
        throw new Error(error)
    }

}

export const getPropertyById = async(id: string): Promise<IProperty> => {
    try {
        const res = await fetch(`${API_URL}/properties/unique/${id}`, {
            next: { revalidate: 1200}
        });

        if (!res.ok) {
            throw new Error(`Fallo al realizar el fetch a Propiedades por ID: ${res.status} ${res.statusText}`);
        };

        const property: IProperty = await res.json();
        return property;
    } catch (error: any) {
        console.error("Error in getPropertyById:", error.message || error);
        throw new Error(error)
    }

}