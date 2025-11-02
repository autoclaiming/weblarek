import './scss/styles.scss';

import { ContactForm } from './components/views/Form/ContactForm.ts';
import { IOrderResult, IProduct, TPayment } from './types/index.ts';
import { CardCatalog } from './components/views/Cards/CardCatalog'
import { OrderForm } from './components/views/Form/OrderForm.ts';
import { CardView } from './components/views/Cards/CardView.ts';
import { cloneTemplate, ensureElement } from './utils/utils.ts';
import { CardCart } from './components/views/Cards/CardCart.ts';
import { Cart as CartView } from './components/views/cart.ts';
import { API_URL, templateElements } from "./utils/constants";
import { ShopApi } from './components/Models/shopApi.ts';
import { Products } from './components/Models/Products';
import { EventEmitter } from './components/base/Events';
import { Success } from './components/views/success.ts';
import { Buyer } from './components/Models/Buyer.ts';
import { Gallery } from './components/views/gallery';
import { Header } from './components/views/header';
import { Modal } from './components/views/modal';
import { Cart } from './components/Models/Cart';
import { Api } from './components/base/Api.ts';
import { CDN_URL } from './utils/constants';

const events = new EventEmitter();
let contactFormInstance: ContactForm | null = null;
let orderFormInstance: OrderForm | null = null;

const products = new Products(events);
const buyer = new Buyer(events);
const cart = new Cart(events);

const apiBase = new Api(API_URL);
const shopApi = new ShopApi(apiBase);

const modalContainer = document.getElementById('modal-container') as HTMLElement;
const header = new Header(document.body, events)
const modal = new Modal(modalContainer, events);
const gallery = new Gallery(document.body);

header.counter = cart.getQuanity();

// Изменение каталога
events.on('catalog:changed', () => {
    gallery.items = products.getProducts().map(item => {
        const cardTemplateElement = cloneTemplate(ensureElement(templateElements.cardCatalog));
        const card = new CardCatalog(cardTemplateElement, {
            onClick: () => events.emit('card:selected', item)
        });

        card.cardTitle = item.title;
        card.cardImage = CDN_URL + item.image;
        card.cardPrice = item.price;
        card.cardCategory = item.category;
        return card.render();
    });
});

// Подробный обзор карточки
events.on('card:selected', (item: IProduct) => {
    const inbasket = cart.contains(item.id)
    products.setCard(item)

    const card = new CardView(cloneTemplate(ensureElement(templateElements.cardPreview)), {
        onClick: () => {
            const eventType = inbasket ? 'card:remove' : 'card:add';
            events.emit(eventType, item);
        }
    });
    card.buttonText = inbasket ? 'Удалить из корзины' : 'Добавить в корзину';
    card.cardTitle = item.title;
    card.cardImage = CDN_URL + item.image;
    card.cardPrice = item.price;
    card.cardCategory = item.category;
    card.cardDescription = item.description;
    modal.content = card.render();
    modal.open();
});

// Добавляет карту в корзину
events.on('card:add', (item: IProduct) => {
    cart.addProduct(item)

    modal.close()
    header.counter = cart.getQuanity();
})

// Удаляет карту из корзины
events.on('card:remove', (item: IProduct) => {
    cart.deleteProduct(item)

    modal.close()
    header.counter = cart.getQuanity();
})

// Окно корзины
events.on('basket:open', () => {
    const cartItemsData = cart.getProductsList();

    const cartItemCards = cartItemsData.map((item, index) => {
        const cartCardTemplateElement = cloneTemplate(ensureElement(templateElements.cardBasket));
        const cartCard = new CardCart(cartCardTemplateElement, {
            onRemove: () => {
                events.emit('cart:item:removed', item);
            },
        });


        cartCard.titleCard = item.title;
        cartCard.priceCard = String(item.price);
        cartCard.indexCard = String(index + 1);


        return cartCard.render();
    });

    const cartViewInstance = new CartView(cloneTemplate(ensureElement(templateElements.basket)), {
        onOrder: () => {
            events.emit('cart:order');
        }
    });

    cartViewInstance.items = cartItemCards;
    cartViewInstance.totalPrice = cart.getTotalPrice();

    modal.content = cartViewInstance.render();
    modal.open();
});

// Удаляет товар из корзины
events.on('cart:item:removed', (item: IProduct) => {
    cart.deleteProduct(item);
    header.counter = cart.getQuanity();
    events.emit('basket:open');
});

// Окно с адрессом и способом оплаты
events.on('cart:order', () => {
    const order = new OrderForm(cloneTemplate(ensureElement(templateElements.order)), {
        onSubmit: (event: Event) => {
            event.preventDefault();
            events.emit('order:submit');
        },
        onPaymentChange: (payment: TPayment) => {
            buyer.setPaymentMethod(payment);
            order.payment = payment
            events.emit('order:validate');
        },
        onAddressChange: (address: string) => {
            buyer.setAddress(address);
            events.emit('order:validate');
        }
    });
    orderFormInstance = order;
    modal.content = orderFormInstance.render({
        payment: buyer.getData().payment,
        address: buyer.getData().address
    });
    modal.open();
    events.emit('order:validate');
});

// Валидация Payment:Address
events.on('order:validate', () => {
    if (orderFormInstance) {
        const { errors, isValid } = buyer.validationOrder();
        orderFormInstance.displayErrors(String(errors.address || '') + ' ' + String(errors.payment || ''));
        orderFormInstance.setSubmitState(!isValid);
    }
});

// Окно вводом контактов(телефон:почта)
events.on('order:submit', () => {
    const contacts = new ContactForm(cloneTemplate(ensureElement(templateElements.contacts)), {

        onOrderEnd: (event) => {
            event.preventDefault();
            const orderData = {
                items: cart.getProductsList().map(item => item.id),
                total: cart.getTotalPrice(),
                payment: buyer.getData().payment,
                address: buyer.getData().address,
                email: buyer.getData().email,
                phone: buyer.getData().phone,
            };
            shopApi.postResponse(orderData)
                .then((result: IOrderResult) => {

                    events.emit('order:success', { 
                        total: cart.getTotalPrice(),
                        orderId: result.id 
                    });
                })
                .catch((error) => {
                    console.error('Order submission failed:', error);
                    events.emit('order:error', { error });
                });

        },

        onEmailChange: (email: string) => {
            buyer.setEmail(email);
            events.emit('contacts:validate');
        },
        onPhoneChange: (phone: string) => {
            buyer.setPhone(phone);
            events.emit('contacts:validate');
        }
    });

    contactFormInstance = contacts;
    modal.content = contacts.render({
        phone: buyer.getData().phone,
        email: buyer.getData().email
    });
    modal.open();
    events.emit('contacts:validate');
});

// Валидация Phone:Email
events.on('contacts:validate', () => {
    if (contactFormInstance) {
        const { errors, isValid } = buyer.validateContactsForm();
        contactFormInstance.displayErrors(String(errors.phone || '') + ' ' + String(errors.email || ''));
        contactFormInstance.setSubmitState(!isValid);
    }
})

// Окно с удачной почкупкой 
events.on('order:success', (result: { total: number }) => {

    const orderComplete = new Success(cloneTemplate(ensureElement(templateElements.success)), {
        OnSuccess: (event: Event) => {
            event.preventDefault()
            modal.close()
        }
    });
    orderComplete.value = result.total;

    cart.clearCart();
    buyer.clearData();
    header.counter = cart.getQuanity();

    modal.content = orderComplete.render()
    modal.open()
})

// Получение товаров с сервера
shopApi.getProducts()
    .then(items => {
        products.setProducts(items.items);
        events.emit('catalog:changed');
    })
    .catch(err => console.error('Ошибка при получении товаров:', err));
