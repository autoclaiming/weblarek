import { FormComponent } from "./Form";
import { ensureElement } from "../../../utils/utils";
import { IFormAction, TPayment } from "../../../types";

interface IOrderActionAddress extends IFormAction {
    onAddressChange?: (address: string) => void;
    onPaymentChange?: (payment: TPayment) => void;
    onSubmit?: (event: Event) => void;
}

export class OrderForm extends FormComponent {
    protected addressInput: HTMLInputElement;
    protected paymentCashButton: HTMLButtonElement;
    protected paymentCardButton: HTMLButtonElement;
    protected selectedPayment: string = '';
    protected errors: HTMLElement;
    protected submitButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IOrderActionAddress) {
        super(container);

        this.paymentCardButton = ensureElement<HTMLButtonElement>('button[name="card"]', container);
        this.paymentCashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', container);
        this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', container);
        this.submitButton = ensureElement<HTMLButtonElement>('.order__button', container);
        this.errors = ensureElement<HTMLElement>('.form__errors', container);

        this.submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (actions?.onSubmit) {
                this.submitButton.addEventListener('click', actions.onSubmit)
            };
        });

        this.addressInput.addEventListener('input', () => {
            if (actions?.onAddressChange) {
                actions.onAddressChange(this.addressInput.value);
            };
        });

        if (actions?.onPaymentChange) {
            this.paymentCardButton.addEventListener('click', () => {
                this.updatePaymentButtons();
                if (actions?.onPaymentChange) {
                    actions.onPaymentChange('online');
                }
            });
        }

        if (actions?.onPaymentChange) {
            this.paymentCashButton.addEventListener('click', () => {
                this.updatePaymentButtons();
                if (actions?.onPaymentChange) {
                    actions.onPaymentChange('cash');
                }
            });
        }
    }

    private updatePaymentButtons() {
        this.paymentCardButton.classList.toggle('button_alt-active', this.selectedPayment === 'online');
        this.paymentCashButton.classList.toggle('button_alt-active', this.selectedPayment === 'cash');
    }

    set payment(value: TPayment) {
        this.selectedPayment = value;
        this.updatePaymentButtons();
    }
}