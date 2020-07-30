-- Reference only; table creation done externally in elephantSQL
CREATE TABLE partners(
    id SERIAL PRIMARY KEY,
    partner1 VARCHAR(64),
    partner2 VARCHAR(64),
    FOREIGN KEY(partner1) REFERENCES users(partner_code),
    FOREIGN KEY(partner2) REFERENCES users(partner_code)
);