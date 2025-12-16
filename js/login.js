import { USERS_BASE_URL } from "./info.js";
import { showModal } from "./modal.js";
import { LOCAL_STORAGE_USER_EMAIL } from "./info.js";

document.querySelector('#frmLogin').addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(`${USERS_BASE_URL}/users`)
    .then(response => response.json())
    .then(data => {
        const email = e.target.txtEmail.value.trim();
        const password = e.target.txtPassword.value.trim();
        // Sets found to false BECAUSE when the user lands on the login page, the input fields would be empty.
        // Therefore there will be no user found yet
        let found = false;
        data.forEach(user => {
            // If not found = if th einput fields are not empty
            if (!found)  {
                if (user.email === email && user.password === password) {
                    localStorage.setItem(LOCAL_STORAGE_USER_EMAIL, email);
                    location.href = 'index.html';

                    found = true;
                }
            }
        });

        if (!found) {
            showModal('Validation error', 'Incorrect credentials');
        }
    })
    .catch(error => console.log(error));
});