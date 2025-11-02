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

export interface IProductList {
    items: IProduct[];
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

export interface ICardActions {
    onClick?: (event: MouseEvent) => void;
}

export interface IBacketActions {
    onRemove?: (event: MouseEvent) => void;
}

export interface IFormAction {
    onSubmit?: (event: MouseEvent) => void;
}

export interface ISuccessAction {
    OnSuccess?: (event: MouseEvent) => void;
}

export interface IBasketAction {
    onOrder?: (event: MouseEvent) => void
}