import { IBasketAction } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Cart extends Component<Cart> {
    protected totalPriceEl: HTMLElement;
    protected basketList: HTMLElement;
    protected orderButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IBasketAction) {
        super(container)
        this.totalPriceEl = ensureElement<HTMLElement>('.basket__price', this.container);
        this.basketList = ensureElement<HTMLElement>('.basket__list', this.container);
        this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        if (actions?.onOrder) {
            this.orderButton.addEventListener('click', actions.onOrder)
        }
    }

    set items(items: HTMLElement[]) {
        this.basketList.replaceChildren();

        // Если товаров нет, показываем сообщение
        if (items.length === 0) {
            this.basketList.insertAdjacentHTML('beforeend', '<li class="basket__item">Корзина пуста</li>');
            this.orderButton.disabled = true;
        } else {
            // Иначе добавляем товары
            this.basketList.replaceChildren(...items);
            this.orderButton.disabled = false; // Разблокируем кнопку
        }
    }

    set totalPrice(value: number) {
        this.totalPriceEl.textContent = `${value} синапсов`
    }
}