document.addEventListener('DOMContentLoaded', function() {
    // Mock user database
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Write a new user to local storage
    function writeUser(user) {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const newUser = { username, password };

            // Check if user already exists
            if (users.find(user => user.username === username)) {
                alert('Username already exists');
            } else {
                writeUser(newUser);
                document.getElementById('successMessage').style.display = 'block';
                setTimeout(function() {
                    window.location.href = 'login.html';
                }, 2000); // Redirect after 2 seconds
            }
        });
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                alert('Login successful');
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }
});


