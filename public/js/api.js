document.addEventListener('DOMContentLoaded', function() {
    // Mock API functions
    function readUsers() {
        return fetch('mock-api/users.json')
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error('Error reading users:', error));
    }

    function writeUser(user) {
        // Simulate writing to the database by logging the user to the console
        console.log('User written to the database:', user);

        // Update the users.json file (for demonstration, we'll use localStorage to simulate this)
        readUsers().then(users => {
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        });
    }

    // Initialize mock database in localStorage
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([
            {
                "username": "testuser",
                "password": "testpassword"
            }
        ]));
    }

    // Override readUsers to read from localStorage for this demo
    function readUsers() {
        return new Promise((resolve, reject) => {
            const users = JSON.parse(localStorage.getItem('users'));
            if (users) {
                resolve(users);
            } else {
                reject('No users found');
            }
        });
    }

    // Registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const newUser = { username, password };

            writeUser(newUser);

            document.getElementById('successMessage').style.display = 'block';
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 2000); // Redirect after 2 seconds
        });
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            readUsers().then(users => {
                const user = users.find(user => user.username === username && user.password === password);
                if (user) {
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Invalid username or password');
                }
            });
        });
    }
});
