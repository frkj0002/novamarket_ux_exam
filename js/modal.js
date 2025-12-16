export const modal = document.querySelector('#mdlInfo');
export const showModal = (header, text) => {
    modal.querySelector('h1').innerText = header;
    modal.querySelector('p').innerText = text;
    modal.showModal();
};

modal.querySelector('.close').addEventListener('click', () => {
    modal.close();
});