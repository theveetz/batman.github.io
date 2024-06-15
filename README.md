# batman.github.io
# Web Application Project

This project includes a web application with a public page, registration page, login page, user profile page, logout process, and a custom 404 response. The application uses HTML, CSS, JavaScript, PHP, and SQLite.

## Directory Structure

- **css/**: Contains the CSS stylesheets.
- **js/**: Contains the JavaScript files.
- **public/**: Contains the public-facing HTML pages.
- **registration/**: Contains the registration page and PHP script.
- **login/**: Contains the login page and PHP script.
- **profile/**: Contains the user profile page and PHP script.
- **logout/**: Contains the logout script.
- **includes/**: Contains the database connection script.
- **404/**: Contains the custom 404 response page.
- **.htaccess**: Apache configuration for custom 404 response.
- **database.sqlite**: SQLite database file.

## Setup

1. Ensure PHP and SQLite are installed on your server.
2. Place the project files in your web server's root directory.
3. Access the public page via your web browser to start using the application.

## Usage

- Visit the public page to navigate to the registration or login pages.
- Register a new user to create an account.
- Log in with the registered credentials to access the user profile page.
- Use the logout link to end the session.

## Security

- Passwords are hashed using bcrypt.
- Sessions are used to manage user authentication.
