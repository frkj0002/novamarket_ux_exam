// import { BASE_URL } from "./info.js";

// export const showProductByCategories = (category) => {
//     const endpoint = `${BASE_URL}/category/${category}`;

//     fetch (endpoint)
//     .then(response => response.json())
//     .then((data) => showProductByCategories(JSON.parse(data)))
//     .catch(error => console.log(error));
// };

// import { loadAllProducts } from "./products.js";
// import { loadProductsByCategory } from "./products.js";

import { queryProducts } from "./products.js";

document.querySelectorAll('#mainNavigation li').forEach(item => {
    const link = item.querySelector('a');
    link.addEventListener('click', e => {
        e.preventDefault();

        // Visual selected class
        document.querySelector('#mainNavigation li.selected')?.classList.remove('selected');
        item.classList.add('selected');

        const categoryId = item.id;

        window.location.hash = categoryId;
        queryProducts(item.id);
    });
});

// Default load alle produkter
queryProducts('products');