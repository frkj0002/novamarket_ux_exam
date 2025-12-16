import { BASE_URL } from "./info.js";
// import { addToCart } from "./cart.js";
import { addToCart } from "./cartActions.js";

const showProduct = (info) => {
    const heroSection = document.querySelector("#heroSection");
    heroSection.querySelector('h1').innerText = info.title;
    
    const productInfo = document.querySelector("#productInfo");
    const productImage = productInfo.querySelector('img');
    productImage.src = info.image;
    productImage.alt = info.title;

    productInfo.querySelector('.productCategory').innerText = info.category;
    productInfo.querySelector('#productDescription > p').innerText = info.description;

    productInfo.querySelector('#productRating > div > #rate').innerText = info.rating.rate;
    productInfo.querySelector('#productRating > #count').innerText = info.rating.count + " reviews";

    productInfo.querySelector('#productPrice > p').textContent = info.price + " USD";

    const btn = productInfo.querySelector('#btnAddToCart');
    if (btn) {
        btn.addEventListener('click', () => addToCart(info.id));
    }
};

// Get the query string and parse it into an object
const queryParams = new URLSearchParams(location.search);
// Get the specific paramter - here the id of the product
const productID = queryParams.get('id');

// Use the productID to get and load the correct product from the API
await fetch(`${BASE_URL}/${productID}`)
.then(response => response.json())
.then(data => {
    showProduct(data);  
})
.catch(error => console.log(error));




