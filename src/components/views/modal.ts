import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Modal extends Component<HTMLElement> {
    protected closeButton: HTMLElement;
    protected contentContainer: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.closeButton = ensureElement('.modal__close', container);
        this.contentContainer = ensureElement('.modal__content', container);

        this.closeButton.addEventListener('click', (event) => {
            event.preventDefault(),
                this.close()
        });

        container.addEventListener('click', (e) => {
            if (e.target === container) this.close();
        });

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.container.classList.contains('modal_active')) {
                this.close();
            }
        });
    }

    set content(content: HTMLElement) {
        this.contentContainer.replaceChildren(content);
    }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close() {
        this.container.classList.remove('modal_active');
        this.events.emit('modal:close');
    }

    // Метод render() возвращает разметку класса
    render(): HTMLElement {
        return this.container;
    }
}