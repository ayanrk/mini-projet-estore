INSERT IGNORE INTO categories (id, name, description) VALUES
                                                          (1, 'Informatique', 'Ordinateurs et accessoires'),
                                                          (2, 'Livres', 'Romans et manuels'),
                                                          (3, 'Sport', 'Équipements sportifs'),
                                                          (4, 'Vêtements', 'Mode homme et femme');

INSERT IGNORE INTO products (id, name, description, price, image_url, category_id) VALUES
                                                                                       (1, 'Laptop HP 15', 'Intel Core i5, 8Go RAM, 512Go SSD', 5500.00, 'https://via.placeholder.com/300x200?text=Laptop', 1),
                                                                                       (2, 'Clavier Mécanique', 'RGB, switches Cherry MX', 350.00, 'https://via.placeholder.com/300x200?text=Clavier', 1),
                                                                                       (3, 'Souris Logitech', 'Sans fil, ergonomique', 200.00, 'https://via.placeholder.com/300x200?text=Souris', 1),
                                                                                       (4, 'Clean Code', 'Robert C. Martin', 120.00, 'https://via.placeholder.com/300x200?text=CleanCode', 2),
                                                                                       (5, 'Spring Boot in Action', 'Guide pratique Spring Boot', 150.00, 'https://via.placeholder.com/300x200?text=Spring', 2),
                                                                                       (6, 'Ballon de Football', 'Taille 5, qualité match', 80.00, 'https://via.placeholder.com/300x200?text=Ballon', 3),
                                                                                       (7, 'T-shirt Nike', 'Coton respirant', 95.00, 'https://via.placeholder.com/300x200?text=Tshirt', 4);

INSERT IGNORE INTO inventories (id, quantity, product_id) VALUES
                                                              (1, 50, 1),
                                                              (2, 30, 2),
                                                              (3, 20, 3),
                                                              (4, 25, 4),
                                                              (5, 15, 5),
                                                              (6, 100, 6),
                                                              (7, 45, 7);

INSERT IGNORE INTO users (id, first_name, last_name, email, password) VALUES
                                                                          (1, 'Admin', 'Store', 'admin@estore.com', 'admin123'),
                                                                          (2, 'Youssef', 'Alami', 'youssef@test.com', 'test123');

INSERT IGNORE INTO profiles (id, phone, address, city, country, user_id) VALUES
                                                                             (1, '0600000000', '1 Rue du Store', 'Casablanca', 'Maroc', 1),
                                                                             (2, '0611223344', '12 Bd Hassan II', 'Rabat', 'Maroc', 2);