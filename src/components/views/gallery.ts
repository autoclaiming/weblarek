import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IGalleryData {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGalleryData> {
    protected catalogEl: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.catalogEl = ensureElement<HTMLElement>('.gallery', this.container);
    }

    // Устанавливаем карточки в каталог
    set items(items: HTMLElement[]) {
        this.catalogEl.replaceChildren(...items);
    }
}