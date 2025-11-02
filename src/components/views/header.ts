import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Header extends Component<HTMLElement> {
    protected basketButton: HTMLElement;
    protected basketCounter: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.basketButton = ensureElement('.header__basket', container);
        this.basketCounter = ensureElement('.header__basket-counter', container);

        this.basketButton.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    // Число товаров в корзине
    set counter(value: number) {
        this.basketCounter.textContent = value.toString();
    }
}