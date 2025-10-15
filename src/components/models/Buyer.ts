import { IBuyer, TPayment } from "../../types"

export class Buyer implements IBuyer {
    payment: TPayment;
    address: string;
    email: string;
    phone: string;

    constructor(payment: TPayment, address: string, email: string, phone: string) {
        this.payment = payment;
        this.address = address;
        this.email = email;
        this.phone = phone;
    }

    // Получаем новые данные
    setData(info: IBuyer) {
        this.payment = info.payment;
        this.address = info.address;
        this.email = info.email;
        this.phone = info.phone;
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
    }

    // валидация данных
    validateData() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;

        const isValidPayment = this.payment === "online" || this.payment === "cash";
        const isValidEmail = emailRegex.test(this.email);
        const isValidPhone = phoneRegex.test(this.phone);
        const isValidAddress = this.address.length > 0;

        return isValidPayment && isValidEmail && isValidPhone && isValidAddress;
    }

}