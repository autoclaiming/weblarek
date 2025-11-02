import { IBacketActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Card } from './Card'

export class CardCart extends Card {
    protected deleteBtn: HTMLButtonElement;
    protected index: HTMLElement;

    constructor(container: HTMLElement, actions?: IBacketActions) {
        super(container)
        this.index = ensureElement<HTMLButtonElement>('.basket__item-index', container);
        this.deleteBtn = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        if (actions?.onRemove) {
            this.deleteBtn.addEventListener('click', actions.onRemove)
        }
    }

    set indexCard(value: string) {
        this.index.textContent = value;
    }

    set titleCard(value: string) {
        this.title.textContent = value;
    }

    set priceCard(value: string) {
        this.price.textContent = `${value} синапсов`; 
    }

}