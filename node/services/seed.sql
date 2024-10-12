DROP DATABASE IF EXISTS homes;
CREATE DATABASE homes;


\c homes; 

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS admin_users;
DROP TABLE IF EXISTS sessions;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone_number VARCHAR NOT NULL,
    has_realtor BOOLEAN NOT NULL DEFAULT FALSE,
    brokerage VARCHAR NULL,
    optional_text TEXT,
    notes VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE address (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_ids UUID[] DEFAULT '{}',
    street VARCHAR NOT NULL,
    zip_code VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    brokerage VARCHAR NULL,
    user_ids UUID[] DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
    encrypted_session_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);


INSERT INTO users (id, name, email, phone_number, has_realtor, brokerage) VALUES 
('10000000-0000-0000-0000-000000000000', 'Richard', 'rich.green@kw.com', '123-456-7890', 'true', 'Big Business'),
('20000000-0000-0000-0000-000000000000', 'other', 'other@kw.com', '123-456-7890', 'false', 'null');

INSERT INTO address (street, zip_code, state, city) VALUES
    ('123 Main', '11111', 'OK', 'Oakland');

INSERT INTO admin_users (name, email, password, brokerage, user_ids) VALUES
    ('Admin User 1', 'admin1@example.com', 'hashed_password', 'ABC Realty', '{10000000-0000-0000-0000-000000000000, 20000000-0000-0000-0000-000000000000}')