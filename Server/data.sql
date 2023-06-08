CREATE DATABASE purchase;

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  hashed_password VARCHAR(255)
);

CREATE TABLE shopping_lists (
  id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) REFERENCES users(email),
  name VARCHAR(255) NOT NULL,
  date_created DATE NOT NULL
);

CREATE TABLE list_items (
  id SERIAL PRIMARY KEY,
  list_id INTEGER REFERENCES shopping_lists(id),
  item_name VARCHAR(255) NOT NULL,
  item_price DECIMAL(6, 2) NOT NULL,
  date_added DATE NOT NULL
);