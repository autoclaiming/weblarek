import { FormComponent } from "./Form";
import { ensureElement } from "../../../utils/utils";
import { IFormAction } from "../../../types";

interface IContactForm extends IFormAction {
    onPhoneChange?: (phone: string) => void;
    onEmailChange?: (email: string) => void;
    onOrderEnd?: (event: Event) => void;
}

export class ContactForm extends FormComponent {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;
    protected submitorder: HTMLInputElement;

    constructor(container: HTMLElement, actions?: IContactForm) {
        super(container)
        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', container);
        this.submitorder = ensureElement<HTMLInputElement>('button[type="submit"]', container);

        this.submitElement.addEventListener('click', (event) => {
            event.preventDefault();
            if (actions?.onOrderEnd)
                actions?.onOrderEnd(event)
        });

        this.emailInput.addEventListener('input', () => {
            if (actions?.onEmailChange) {
                actions.onEmailChange(this.emailInput.value);
            };
        });

        this.phoneInput.addEventListener('input', () => {
            if (actions?.onPhoneChange) {
                actions.onPhoneChange(this.phoneInput.value);
            };
        });
    }

    set email(value: string) {
        (this.emailInput as HTMLInputElement).value = value;
    }

    set phone(value: string) {
        (this.phoneInput as HTMLInputElement).value = value;
    }

}