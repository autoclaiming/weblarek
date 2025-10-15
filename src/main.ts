import { ShopApi } from './components/models/ApiShop';
import { Buyer } from './components/models/Buyer';
import { Cart } from './components/models/Cart';
import { Products } from './components/models/Products';
import { apiProducts } from "./utils/data";
import { API_URL } from "./utils/constants"
import { Api } from './components/base/Api';

const products = new Products();
const cart = new Cart();
const buyer = new Buyer('', '', '', ''); // Пустые начальные значения

function testingProducts() {

    console.log('Установка товаров:', products.getProducts().length); // Установка товаров
    const found = products.getProductById('854cef69-976d-4c2a-a18c-2aa45046c390');
    console.log('Поиск по ID:', found?.title === '+1 час в сутках');        // Поиск по ID
    products.setCard(found!);
    console.log('Работа с карточкой:', products.getCard()?.price === 750); // Работа с карточкой
    console.log('Несуществующий ID:', products.getProductById('xxx') === null); // Несуществующий ID
}

function testingCart() {

    console.log('Пустое состояние:', cart.getProductsList().length === 0); // Проверка пустого состояния
    const [product1, product2] = apiProducts.items;
    cart.addProduct(product1);
    cart.addProduct(product2);
    console.log('Добавление товаров:', cart.getProductsList().length === 2); // Добавление товаров 
    console.log('Получение количества:', cart.getQuanity() === 2); // Получение количества
    console.log('Получение стоимости:', cart.getTotalPrice() === (750 + 1450)); // Получение стоимости
    console.log('Проверка наличия товара:', cart.contains(product1.id) === true); // Проверка наличия товара
    cart.deleteProduct(product1.id);
    console.log('Удаление товара:', cart.getProductsList().length === 1); // Удаление товара
    cart.clearCart();
    console.log('Очистка корзины:', cart.getProductsList().length === 0); // Очистка корзины
}

function testingBuyer() {

    // Тестирование установки данных
    buyer.setData({
        payment: 'online',
        email: 'test@example.com',
        phone: '+79999999999',
        address: 'Test Address'
    });
    console.log('Данные покупателя:', buyer.getData());

    // Тестирование валидации
    const validation1 = buyer.validateData();
    console.log('Валидация при заполненных данных:', Object.keys(validation1).length === 0);

    // Тестирование очистки
    buyer.clearData();
    const validation2 = buyer.validateData();
    console.log('Валидация после очистки:', Object.keys(validation2).length == 0);
    console.log('Ошибки валидации:', validation2);
}

function testingAPI() {
    const apiInstance = new Api(API_URL);
    const shopApi = new ShopApi(apiInstance);
    shopApi.getProducts()
        .then(response => {
            console.log("Ответ от сервера:", response);
            // Предполагаем, что товары находятся в свойстве items
            products.setProducts(response.items);
            console.log("Товары из модели:", products.getProducts());
        })
        .catch(err => console.error("Ошибка при получении товаров:", err));
}


console.log('\n---Тестирование Cart Модуля---')
testingCart()
console.log('\n---Тестирование ShopApi Модуля---')
testingAPI()
setTimeout(() => {
    console.log('\n---Тестирование Buyer Модуля---')
    testingBuyer()
    console.log('\n---Тестирование Products Модуля---')

    testingProducts()
}, 2000);
