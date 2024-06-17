-- Create database
CREATE DATABASE net300_db;

-- Use the created database
USE net300_db;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    company VARCHAR(100),
    address VARCHAR(255),
    dob DATE
);

-- Insert actual and mock data into users table
INSERT INTO users (username, password, first_name, last_name, email, company, address, dob) VALUES
('your_username_1', 'your_hashed_password_1', 'YourFirstName1', 'YourLastName1', 'your.email1@example.com', 'YourCompany1', 'YourAddress1', 'YourDOB1'),
('your_username_2', 'your_hashed_password_2', 'YourFirstName2', 'YourLastName2', 'your.email2@example.com', 'YourCompany2', 'YourAddress2', 'YourDOB2'),
('testuser1', 'hashed_password_1', 'John', 'Doe', 'john.doe@example.com', 'Company A', '123 Street, City', '1990-01-01'),
('testuser2', 'hashed_password_2', 'Jane', 'Smith', 'jane.smith@example.com', 'Company B', '456 Avenue, City', '1985-05-15'),
('testuser3', 'hashed_password_3', 'Alice', 'Johnson', 'alice.johnson@example.com', 'Company C', '789 Boulevard, City', '1992-07-21');

-- Create logs table
CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert mock data into logs table
INSERT INTO logs (user_id, action) VALUES
(1, 'User login'),
(2, 'User login'),
(3, 'User registration'),
(4, 'User updated profile'),
(5, 'User logout');
