import { IProduct } from "../../types";

export class Products {
    products: IProduct[] = [];
    item: IProduct | null = null;

    // Получить список товаров
    getProducts(): IProduct[] {
        return [...this.products];
    }

    // Сохранить список товаров
    setProducts(products: IProduct[]) {
        this.products = products;
    }

    // Получить карточку
    getCard(): IProduct | null {
        return this.item;
    }

    // Сохранить карточку
    setCard(product: IProduct) {
        this.item = product;
    }

    // Получить карточку по id
    getProductById(id: string): IProduct | null {
        return this.products.find(product => product.id === id) || null;
    }

}