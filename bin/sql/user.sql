-- Reference only; table creation done externally in elephantSQL
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(64),
    family_name VARCHAR(64),
    given_name VARCHAR(64),
    partner_code VARCHAR(64) UNIQUE,
    has_partner VARCHAR(64) DEFAULT NULL,
    sent_request VARCHAR(64) DEFAULT NULL,
    has_request VARCHAR(64) DEFAULT NULL,
    nickname VARCHAR(64),
    avatar VARCHAR(64) DEFAULT NULL
);