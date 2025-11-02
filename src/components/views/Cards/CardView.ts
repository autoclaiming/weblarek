import { ensureElement } from "../../../utils/utils";
import { Card } from './Card'
import { categoryMap } from "../../../utils/constants";
import { ICardActions } from "../../../types";

export class CardView extends Card {
    protected category: HTMLElement;
    protected description: HTMLElement;
    protected image: HTMLImageElement;
    protected buttonEl: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container)

        this.category = ensureElement<HTMLElement>('.card__category', this.container)
        this.description = ensureElement<HTMLElement>('.card__text', this.container)
        this.image = ensureElement<HTMLImageElement>('.card__image', this.container)
        this.buttonEl = ensureElement<HTMLButtonElement>('.button.card__button', this.container)

        if (actions?.onClick) {
            this.buttonEl.addEventListener('click', actions.onClick)
        }
    }

    set cardPrice(value: number | null) {
        if (value == null) {
            this.buttonEl.disabled = true
            this.price.textContent = 'Бесценно';
            this.buttonEl.textContent = 'Недоступно';
        }
        else {
            this.buttonEl.disabled = false
            this.price.textContent = `${value} синапсов`;
        }
    }

    set cardImage(value: string) {
        this.setImage(this.image, value, this.title.textContent);
    }

    set cardCategory(value: string) {
        this.category.className = 'card__category';
        const categoryClass = categoryMap[value as keyof typeof categoryMap] || 'card__category_other';
        this.category.classList.add(categoryClass);
        this.category.textContent = value;
    }

    set cardTitle(value: string) {
        this.title.textContent = value;
    }

    set cardDescription(value: string) {
        this.description.textContent = value;
    }

    set buttonText(value: string) {
        this.buttonEl.textContent = value;
    }
}