import { queryProducts } from "./products.js";

document.querySelectorAll('#mainNavigation li').forEach(item => {
    const link = item.querySelector('a');
    link.addEventListener('click', e => {
        e.preventDefault();

        // Visual selected class
        document.querySelector('#mainNavigation li.selected')?.classList.remove('selected');
        item.classList.add('selected');

        // const categoryId = item.id;

        // window.location.hash = categoryId;
        queryProducts(item.id);
    });
});

queryProducts('products');