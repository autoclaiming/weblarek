import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { categoryMap } from "../../../utils/constants";
import { ICardActions } from '../../../types/index'

export class CardCatalog extends Card {
    protected image: HTMLImageElement;
    protected category: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this.category = ensureElement<HTMLElement>('.card__category', this.container)
        this.image = ensureElement<HTMLImageElement>('.card__image', this.container)

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick)
        }
    }

    set cardCategory(value: string) {
        this.category.className = 'card__category';
        const categoryClass = categoryMap[value as keyof typeof categoryMap] || 'card__category_other';
        this.category.classList.add(categoryClass);
        this.category.textContent = value;
    }

    set cardImage(value: string) {
        this.setImage(this.image, value, this.title.textContent);
    }

    set cardPrice(value: number | null) {
        this.price.textContent = value == null ? 'Бесценно' : `${value} синапсов`;
    }

    set cardTitle(value: string) {
        this.title.textContent = value;
    }
}