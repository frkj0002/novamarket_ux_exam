import { USERS_BASE_URL } from "./info.js";
import { showModal } from "./modal.js";

document.querySelector('#frmSignup').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = e.target.txtEmail.value.trim();
    const password = e.target.txtPassword.value.trim();
    const repeatPassword = e.target.txtRepeatPassword.value.trim();

    if (password !== repeatPassword) {
        showModal('Validation error', 'Both passwords must match');
        return; // Validation failed - stop the function and do not continue the rest of the code!!
    }

    const newUser = {
        email: email,
        password: password
    };

    fetch(`${USERS_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => { // eslint-disable-line no-unused-vars
        showModal('Signed up successfully', 'Your user was created');
        e.target.reset();
    })
    .catch(error => console.log(error));
});

