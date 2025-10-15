export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = "online" | "cash" | "";

export interface IProduct {
    category: string;
    description: string;
    id: string;
    image: string;
    price: number | null;
    title: string;
}

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export interface IOrderRequest {
    items: string[],
    total: number
}

export interface IOrderResult {
    id: string,
    total: number
}

