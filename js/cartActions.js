import { LOCAL_STORAGE_USER_EMAIL } from "./info.js";

export const addToCart = (productID) => {
    const userEmail = localStorage.getItem(LOCAL_STORAGE_USER_EMAIL);

    const carts = JSON.parse(localStorage.getItem('carts')) ?? {};
    const userCart = carts[userEmail] ?? [];

    const exisistingProduct = userCart.find(item => item.id == productID);
    if (exisistingProduct) {
        exisistingProduct.quantity++;
    } else {
        userCart.push({ id: productID, quantity: 1});
    }
    carts[userEmail] = userCart;
    localStorage.setItem('carts', JSON.stringify(carts));

    console.log(`${productID} added to cart for ${userEmail}`);

    window.location.replace("cart.htm")
};

export const removeFromCart = (productID) => {
    const userEmail = localStorage.getItem(LOCAL_STORAGE_USER_EMAIL);
    const carts = JSON.parse(localStorage.getItem('carts')) ?? {};
    let userCart = carts[userEmail] ?? [];

    userCart = userCart.filter(item => item.id != productID);

    carts[userEmail] = userCart;
    localStorage.setItem('carts', JSON.stringify(carts));
    
}