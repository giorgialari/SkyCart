-- Create la tabella users
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL
);


-- Crea la tabella products
CREATE TABLE products (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    category VARCHAR(255),
    rating DECIMAL(3, 1),
    price DECIMAL(10, 2)
);

-- Inserisce i valori nella tabella products
INSERT INTO products (id, title, category, rating, price) VALUES
(1, 'Drone X1', 'Entry-Level', 4.2, 200.00),
(2, 'SkyMaster Pro', 'Professional', 4.8, 1500.00),
(3, 'FlyEase Mini', 'Portable', 3.9, 120.00),
(4, 'AeroSwift X3', 'Racing', 4.5, 350.00),
(5, 'VisionMaster', 'Photography', 4.7, 800.00),
(6, 'Explorer Z200', 'Outdoor', 4.3, 250.00);


--Tabella del carrello
CREATE TABLE cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
