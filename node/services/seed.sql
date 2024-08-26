DROP DATABASE IF EXISTS homes;
CREATE DATABASE homes;

\c homes; 

CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    realtor VARCHAR NOT NULL,
    brokerage VARCHAR NULL,
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone_number VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    has_realtor BOOLEAN NOT NULL DEFAULT FALSE,
    brokerage VARCHAR NULL
);

-- Remove the unique constraint on email
ALTER TABLE users DROP CONSTRAINT uq_users_email;
-- ALTER TABLE users DROP CONSTRAINT email;


INSERT INTO users (name, email, phone_number, address, has_realtor, brokerage) VALUES 
('Richard', 'Green', '123-456-7890', 'rich.green@kw.com', 'true', 'Big Business');