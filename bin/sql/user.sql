-- Reference only; table creation done externally in elephantSQL
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(64),
    family_name VARCHAR(64),
    given_name VARCHAR(64),
    partner_code VARCHAR(64)
);