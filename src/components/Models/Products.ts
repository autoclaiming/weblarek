import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Products {
    products: IProduct[] = [];
    item: IProduct | null = null;

    constructor(protected events: IEvents) { }

    // Получить список товаров
    getProducts(): IProduct[] {
        return [...this.products];
    }

    // Сохранить список товаров
    setProducts(products: IProduct[]): void {
        this.products = [...products];
        this.events.emit('products:updated', products);
    }

    // Получить карточку
    getCard(): IProduct | null {
        return this.item;
    }

    // Сохранить карточку
    setCard(product: IProduct) {
        this.item = product;
        this.events.emit('products:updated', product);
    }

    // Получить карточку по id
    getProductById(id: string): IProduct | null {
        return this.products.find(product => product.id === id) || null;
    }

}