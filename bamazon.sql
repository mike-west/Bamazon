DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price DECIMAL(14,2) UNSIGNED,
    stock_quantity INTEGER UNSIGNED,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES
        ("Death Star", "Sith Empire", 10000000000, 2)
       ,("Bird of Prey", "Klingon Empire", 50000000, 6)
       ,("Set of Quiddich Balls", "Diagon Alley", 54.98, 123)
       ,("Bertie Bots Every Flavor Beans", "Diagon Alley", 3.95, 4000)
       ,("Tribble", "Iota Geminorum IV", 0.02, 135791357)
       ,("He-Man Action figure", "Toys", 7.98, 87)
       ,("Fidget Spinner", "Toys", 1.95, 57)
       ,("Original Barbie Doll", "Toys", 1245, 1)
       ,("1909-S VDB Lincoln Penny", "Collectables" , 1850, 1)
       ,("Wammo Water Wiggle", "Toys", 5.68, 22)
       ,("Elvis Presley's Guitar", "Collectables", 5691, 1);