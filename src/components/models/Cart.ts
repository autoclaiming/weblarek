import { IProduct } from "../../types";

export class Cart {
    protected products: IProduct[] = [];

    // получение массива товаров, которые находятся в корзине;
    getProductsList() {
        return this.products
    }

    // добавление товара, который был получен в параметре, в массив корзины;
    addProduct(product: IProduct) {
        this.products.push(product)
    }

    // удаление товара, полученного в параметре из массива корзины;
    deleteProduct(id: string) {
        this.products = this.products.filter(product => product.id !== id)
    }

    // очистка корзины;
    clearCart() {
        this.products = []
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
