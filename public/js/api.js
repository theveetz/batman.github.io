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
}

// Registration form submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
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

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
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
