import { IFormAction } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

export abstract class FormComponent extends Component<{}> {
    protected errorContainer: HTMLElement;
    protected submitElement: HTMLButtonElement;

    constructor(formContainer: HTMLElement, actions?: IFormAction) {
        super(formContainer);

        this.errorContainer = ensureElement<HTMLElement>('.form__errors', formContainer);
        this.submitElement = ensureElement<HTMLButtonElement>('button[type="submit"]', formContainer);


        if (actions?.onSubmit) {
            this.submitElement.addEventListener('click', actions.onSubmit)
        };
    }

    setSubmitState(disabled: boolean) {
        this.submitElement.disabled = disabled;
    }

    resetErrors(): void {
        this.errorContainer.textContent = '';
    }

    displayErrors(message: string): void {
        this.errorContainer.textContent = message;
    }

}