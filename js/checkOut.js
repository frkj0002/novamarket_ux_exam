import { LOCAL_STORAGE_USER_EMAIL } from "./info.js";
import { showModal } from "./modal.js";

document.querySelector('#frmCheckOut').addEventListener('submit', (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem(LOCAL_STORAGE_USER_EMAIL);

    const carts = JSON.parse(localStorage.getItem('carts')) ?? {};
    delete carts[userEmail];
    localStorage.setItem('carts', JSON.stringify(carts));

    showModal('Payment successfull', 'We’ve received your payment and will email an order confirmation shortly.');

    e.target.reset();
})