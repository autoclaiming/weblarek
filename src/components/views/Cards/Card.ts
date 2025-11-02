import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";


export abstract class Card extends Component<{}> {
    protected title: HTMLElement;
    protected price: HTMLElement;

    constructor(container: HTMLElement) {
        super(container)

        this.title = ensureElement<HTMLElement>('.card__title', this.container)
        this.price = ensureElement<HTMLElement>('.card__price', this.container)

    }
}