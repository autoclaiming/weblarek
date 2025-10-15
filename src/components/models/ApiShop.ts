import { Api } from "../base/Api";
import { IOrderRequest, IOrderResult } from "../../types";

export class ShopApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    getProducts(): Promise<IOrderRequest> {
        return this.api.get<IOrderRequest>("/product/")
    }

    postResponse(order: IOrderRequest): Promise<IOrderResult> {
        return this.api.post<IOrderResult>("/order/", order)
    }
} 