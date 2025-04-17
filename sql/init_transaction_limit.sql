INSERT INTO "TransactionLimit" (person, type, grain, limit) VALUES
('Customer', 'Withdrawal', 'Week', 500000),
('Customer', 'Withdrawal', 'Day', 100000),
('CumulativeAgent', 'Withdrawal', 'Day', 1200000),
('Customer', 'Transaction', 'Week', 100000),
('Customer', 'Transaction', 'Day', 20000);