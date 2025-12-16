import { BASE_URL } from './info.js';

const categories = {
    'women': "women's clothing",
    'men': "men's clothing",
    'jewelery': "jewelery",
    'electronics': "electronics"
};

const productList = document.querySelector('#productList');

const assignLink = (anchor, url, text) => {
    anchor.href = url;
    anchor.title = text;
};

export const queryProducts = (categoryId) => {
    let url = BASE_URL;

    if(categoryId && categoryId !== 'products') {
        const catName = categories[categoryId];
        if(catName) {
            url = `${BASE_URL}/category/${encodeURIComponent(catName)}`;
        }
    }

    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                console.error(`Response error: ${response.status} - ${response.statusText}`);
            }
        })
        .then(data => {
            if(data) showProducts(data);
        })
        .catch(err => console.error(err));
};


const showProducts = (products) => {
    productList.innerHTML = '';
    const fragment = document.createDocumentFragment();

    products.forEach(product => {
        const productCard = document.querySelector('#productCard').content.cloneNode(true);

        const linkURL = `product.htm?id=${product.id}`;

        const imageLink = productCard.querySelector('a:has(img)');
        assignLink(imageLink, linkURL, product.title);

        const headerLink = productCard.querySelector('h2 > a');
        headerLink.innerText = product.title;
        assignLink(headerLink, linkURL, product.title);

        const image = productCard.querySelector('article > a > img');
        image.setAttribute('src', product.image);
        image.setAttribute('alt', product.title);

        productCard.querySelector('.productTitle').textContent = product.title;
        productCard.querySelector('.productCategory').textContent = product.category;
        productCard.querySelector('.productPrice').textContent = product.price + ' USD';

        fragment.appendChild(productCard);
    });

    productList.appendChild(fragment);
};