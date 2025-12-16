import { BASE_URL } from "./info.js";

const assignLink = (anchor, url, text) => {
    anchor.href = url; //Sets where the link goes
    anchor.title = text; //Sets a hover text
};

const fragment = document.createDocumentFragment();
    await fetch(`${BASE_URL}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(item => {
            const productCard = document.querySelector('#productCard').content.cloneNode(true);

            const linkURL = `product.htm?id=${item.id}`;
            const imageLink = productCard.querySelector('a:has(img)');
            // Gives the link the correct tooltip text and correct destination
            assignLink(imageLink, linkURL, item.title);

            const headerLink = productCard.querySelector('h2 > a');
            headerLink.innerText = item.title;
            assignLink(headerLink, linkURL, item.title);

            const image = productCard.querySelector('article > a > img');
            image.setAttribute('src', item.image);
            image.setAttribute('alt', item.title);

            productCard.querySelector('.productTitle').textContent = item.title;
            productCard.querySelector('.productCategory').textContent = item.category;
            productCard.querySelector('.productPrice').textContent = item.price + " USD";

            fragment.appendChild(productCard);
        })
    })
    .catch(error => console.log(error));
document.querySelector('#productList').appendChild(fragment);

// fetchProducts();



