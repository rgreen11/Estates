DROP DATABASE IF EXISTS homes;
CREATE DATABASE homes;

\c homes; 

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone_number VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    has_realtor BOOLEAN NOT NULL DEFAULT FALSE,
    brokerage VARCHAR NULL,
    optional_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    realtor VARCHAR NOT NULL,
    brokerage VARCHAR NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id INTEGER REFERENCES admin_users(id) ON DELETE CASCADE,
    data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);



-- Remove the unique constraint on email
ALTER TABLE users DROP CONSTRAINT uq_users_email;
-- ALTER TABLE users DROP CONSTRAINT email;


INSERT INTO users (name, email, phone_number, address, has_realtor, brokerage) VALUES 
('Richard', 'Green', '123-456-7890', 'rich.green@kw.com', 'true', 'Big Business');