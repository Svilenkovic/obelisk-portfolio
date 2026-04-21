-- Nacionale Web Shop Database Schema
-- Run: mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS nacionale CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nacionale;

-- Create user
CREATE USER IF NOT EXISTS 'nacionale_user'@'localhost' IDENTIFIED BY 'Nac10nale!Str0ng';
GRANT SELECT, INSERT, UPDATE, DELETE ON nacionale.* TO 'nacionale_user'@'localhost';
FLUSH PRIVILEGES;

-- Collections
CREATE TABLE IF NOT EXISTS collections (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    city VARCHAR(100) NOT NULL DEFAULT '',
    country VARCHAR(100) NOT NULL DEFAULT '',
    description TEXT,
    accent_color VARCHAR(7) NOT NULL DEFAULT '#c9a84c',
    hero_image VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
) ENGINE=InnoDB;

-- Products
CREATE TABLE IF NOT EXISTS products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    collection_id INT UNSIGNED DEFAULT NULL,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    old_price DECIMAL(10,2) DEFAULT NULL,
    badge VARCHAR(50) DEFAULT NULL,
    design_image VARCHAR(255) DEFAULT NULL,
    colors JSON NOT NULL DEFAULT '["#111111","#f5f5f0"]',
    sizes JSON NOT NULL DEFAULT '["S","M","L","XL","XXL"]',
    featured TINYINT(1) NOT NULL DEFAULT 0,
    active TINYINT(1) NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_collection (collection_id),
    INDEX idx_active_featured (active, featured),
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Orders
CREATE TABLE IF NOT EXISTS orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(200) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    customer_email VARCHAR(200) DEFAULT '',
    address VARCHAR(300) NOT NULL,
    city VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    note TEXT,
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    shipping_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
    status ENUM('pending','confirmed','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_phone (customer_phone),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    color VARCHAR(20) NOT NULL DEFAULT '',
    size VARCHAR(10) NOT NULL DEFAULT '',
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    INDEX idx_order (order_id)
) ENGINE=InnoDB;

-- Settings
CREATE TABLE IF NOT EXISTS settings (
    `key` VARCHAR(100) PRIMARY KEY,
    `value` TEXT
) ENGINE=InnoDB;

INSERT INTO settings (`key`, `value`) VALUES
    ('shipping_cost', '350'),
    ('free_shipping_min', '3000'),
    ('currency', 'RSD')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);

-- =========================================
-- SEED DATA — Srbija Collection
-- =========================================

INSERT INTO collections (name, slug, city, country, description, accent_color) VALUES
    ('Srbija', 'srbija', 'Beograd', 'Srbija', 'Naša prva kolekcija inspirisana lepotom Srbije — od beogradskih ulica do zlatnih planina.', '#c9a84c')
ON DUPLICATE KEY UPDATE name = VALUES(name);

SET @srbija_id = (SELECT id FROM collections WHERE slug = 'srbija');

INSERT INTO products (collection_id, name, slug, description, price, old_price, badge, featured, sort_order) VALUES
    (@srbija_id, 'Beograd Spirit', 'beograd-spirit', 'Inspirisana energijom Beograda — grad koji nikad ne spava. Nosi duh srpske prestonice.', 2490, 2990, '-17%', 1, 1),
    (@srbija_id, 'Srbija Heritage', 'srbija-heritage', 'Ponos srpskog nasleđa. Dizajn koji čuva tradiciju i šalje je u svet.', 2490, NULL, NULL, 1, 2),
    (@srbija_id, 'Novi Sad Vibes', 'novi-sad-vibes', 'Duh Novog Sada — EXIT, Dunav, Petrovaradin. Grad kulture na majici.', 2490, 2990, '-17%', 1, 3),
    (@srbija_id, 'Niš Underground', 'nis-underground', 'Underground scena Niša. Kreativna energija juga Srbije.', 2490, NULL, 'NOVO', 1, 4),
    (@srbija_id, 'Zlatibor Peak', 'zlatibor-peak', 'Inspirisana Zlatiborom — planinski vazduh, zlatne livade, mir prirode.', 2490, NULL, NULL, 1, 5),
    (@srbija_id, 'Đavolja Varoš', 'djavolja-varos', 'Mistika Đavolje Varoši. Prirodno čudo Srbije u jedinstvenom dizajnu.', 2490, 2990, '-17%', 1, 6)
ON DUPLICATE KEY UPDATE name = VALUES(name);
