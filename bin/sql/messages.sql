-- Reference only; table creation done externally in elephantSQL
CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    message TEXT,
    sender_partner_code VARCHAR(64),
    recipient_partner_code VARCHAR(64),
    time_sent VARCHAR(64),
    FOREIGN KEY(sender_partner_code) REFERENCES users(partner_code),
    FOREIGN KEY(recipient_partner_code) REFERENCES users(partner_code)
);