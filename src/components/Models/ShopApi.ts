import { Api } from "../base/Api";
import { IOrderRequest, IOrderResult, IProductList } from "../../types";

export class ShopApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    getProducts(): Promise<IProductList> {
        return this.api.get<IProductList>("/product/")
    }

    postResponse(order: IOrderRequest): Promise<IOrderResult> {
        return this.api.post<IOrderResult>("/order/", order)
    }
} 