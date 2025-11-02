import { IBuyer, TPayment } from "../../types"
import { IEvents } from "../base/Events";

export class Buyer {
    protected payment: TPayment = '';
    protected address: string = '';
    protected email: string = '';
    protected phone: string = '';

    constructor(protected events: IEvents) { }

    // Получаем новые данные
    setData(info: IBuyer) {
        this.setPaymentMethod(info.payment);
        this.setAddress(info.address);
        this.setEmail(info.email);
        this.setPhone(info.phone);
    }

    setPaymentMethod(value: TPayment) {
        this.payment = value;
        this.events.emit('buyer:changed');
    }

    setAddress(value: string) {
        this.address = value;
        this.events.emit('buyer:changed');
    }

    setEmail(value: string) {
        this.email = value;
        this.events.emit('buyer:changed');
    }

    setPhone(value: string) {
        this.phone = value;
        this.events.emit('buyer:changed');
    }

    // получение всех данных покупателя;
    getData() {
        return {
            payment: this.payment,
            address: this.address,
            email: this.email,
            phone: this.phone
        }
    }

    // очистка данных покупателя;
    clearData() {
        this.payment = "";
        this.address = "";
        this.email = "";
        this.phone = "";
        this.events.emit('buyer:changed');
    }

    // Валидация данных для формы заказа (оплата и адрес)
    validationOrder(): { errors: { [key: string]: string }; isValid: boolean } {
        const errors = {
            ...(!this.address && { address: 'Введите адрес доставки' }),
            ...(!this.payment && { payment: 'Необходимо указать способ оплаты' })
        };

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        };
    }

    // Валидация данных для формы контактов (email и телефон)
    validateContactsForm(): { errors: { [key: string]: string }; isValid: boolean } {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;

        const errors = {
            ...((!this.email || !emailRegex.test(this.email)) && { email: 'Необходимо указать корректный Email' }),
            ...((!this.phone || !phoneRegex.test(this.phone)) && { phone: 'Необходимо указать корректный номер телефона' })
        };
        return {
            errors,
            isValid: Object.keys(errors).length === 0
        };
    }


}