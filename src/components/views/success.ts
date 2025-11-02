import { ISuccessAction } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Success extends Component<Success> {
    protected valueEl: HTMLElement;
    protected submitButton: HTMLElement;

    constructor(container: HTMLElement, actions?: ISuccessAction) {
        super(container)
        this.valueEl = ensureElement('.order-success__description', container);
        this.submitButton = ensureElement('.order-success__close', container);


        this.submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            actions?.OnSuccess?.(event);
        });
    }

    set value(value: number) {
        this.valueEl.textContent = `Списано ${value} синапсов`
    }
}