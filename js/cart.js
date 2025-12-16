import { BASE_URL } from "./info.js";
import { LOCAL_STORAGE_USER_EMAIL } from "./info.js";
import { removeFromCart } from "./cartActions.js";

// Generate the Cart list over added products
const showCartList = async () => {
    const userEmail = localStorage.getItem(LOCAL_STORAGE_USER_EMAIL);

    let carts = {};
    try {
        carts = JSON.parse(localStorage.getItem('carts')) ?? {};
    } catch {
        carts = {};
    }
    
    const userCart = carts[userEmail] ?? [];

    const cartList = document.querySelector('#cartList');
    cartList.innerHTML = '';

    userCart.forEach(item => {
        fetch(`${BASE_URL}/${item.id}`)
        .then(response => response.json())
        .then(product => {
            cartList.append(cartProduct(product, item.quantity));
        })
        .catch(error => console.log(error));
    });
};
showCartList();
// document.addEventListener('DOMContentLoaded', showCartList);

// Generate each cart product card to the list above
const cartProduct = (product, quantity) => {
    const productCard = document.querySelector('#cartProduct').content.cloneNode(true);

    productCard.querySelector('article').setAttribute('data-id', product.id);

    const productCardImage = productCard.querySelector('img');
    productCardImage.src = product.image;
    productCardImage.alt = product.title;

    productCard.querySelector('.productName').innerText = product.title;
    productCard.querySelector('.productPrice').innerText = product.price + ' USD';
    productCard.querySelector('.productQuantity').innerText = `Quantity: ${quantity}`;

    productCard.querySelector('#btnRemoveFromCart').addEventListener('click', function () {
        // const productID = this.closest('article').dataset.id;
        removeFromCart(product.id);
        this.closest('article').remove();
    });

    return productCard;
};

const calculateSubTotal = () => {
    const userEmail = localStorage.getItem(LOCAL_STORAGE_USER_EMAIL);

    const carts = JSON.parse(localStorage.getItem('carts')) ?? {};
    const userCart = carts[userEmail] ?? [];

    let subtotal = 0;

    userCart.forEach(item => {
        fetch(`${BASE_URL}/${item.id}`)
        .then(response => response.json())
        .then(product => {
            subtotal += product.price * item.quantity;

            document.querySelector('#totalPrice').innerText = `Total price: ${subtotal.toFixed(2)} USD`;
        })
        .catch(error => console.log(error));
    })
};

calculateSubTotal();


