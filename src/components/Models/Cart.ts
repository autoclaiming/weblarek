import { IProduct } from "../../types";
import { IEvents } from "../base/Events";


export class Cart {
    protected products: IProduct[];

    constructor(protected events: IEvents) {
        this.products = [];
    }

    // получение массива товаров, которые находятся в корзине;
    getProductsList() {
        return this.products
    }

    // добавление товара, который был получен в параметре, в массив корзины;
    addProduct(product: IProduct) {

        if (product.price == null) {
            return
        }

        if (!this.contains(product.id)) {
            this.products.push(product)
            this.events.emit('cart:changed');
        }
    }

    // удаление товара, полученного в параметре из массива корзины;
    deleteProduct(product: IProduct) {
        this.products = this.products.filter(item => item.id !== product.id)
        this.events.emit('cart:changed');
    }

    // очистка корзины;
    clearCart() {
        this.products = []
        this.events.emit('cart:changed');
    }

    // Возращает колчество товара в массиве 
    getProductsQuanity(): number {
        return this.products.length;
    }

    // получение стоимости всех товаров в корзине;
    getTotalPrice(): number {
        return this.products.reduce((sum, product) => sum + (product.price || 0), 0)
    }

    // получение количества товаров в корзине;
    getQuanity(): number {
        return this.products.length
    }

    // проверка наличия товара в корзине по его id, полученного в параметр метода.
    contains(id: string) {
        return this.products.some(p => p.id == id)
    }
}
