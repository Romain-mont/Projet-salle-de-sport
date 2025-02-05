BEGIN;

-- Insertion des abonnements
INSERT INTO "subscription" (type, price, start_date, end_date) VALUES
('mensuel', 29.99, CURRENT_DATE, CURRENT_DATE + INTERVAL '1 month'),
('annuel', 299.99, CURRENT_DATE, CURRENT_DATE + INTERVAL '1 year'),
('sans engagement', 40.00, CURRENT_DATE, CURRENT_DATE + INTERVAL '1 month');


-- Insertion des utilisateurs
INSERT INTO "users" (first_name, last_name, email, password, role, subscription_id) VALUES
('Alice', 'Dupont', 'alice.dupont@example.com', '$2b$10$bZEe2Kf0vZqkDGaFCIAygu8Hf5xtvqD9dM.uLIZA0nvQli.UiLFFK', 'subscriber', 1), -- Mot de passe : testpassword1
('Bob', 'Martin', 'bob.martin@example.com', '$2b$10$FCZhptyaKm2WxPrk6gyO9eBsPZ3UI6js63zWQ6JkeXgQkbCSYfRYy', 'teacher', NULL), -- Mot de passe : testpassword2
('Charlie', 'Durand', 'charlie.durand@example.com', '$2b$10$o7bRTMeW5NBUs/4aGHHXtO0v6ytLIrWZSzKdTfCaJwL4IudkqYtTW', 'admin', NULL), -- Mot de passe : testpassword3
('David', 'Lemoine', 'david.lemoine@example.com', '$2b$10$dqm.fyKmO/KpArkQksqFY.LMoeWjWyVKvCq9ao6hkDb.P5qXqsA.2', 'subscriber', 2); -- Mot de passe : testpassword4
-- Insertion des cours
INSERT INTO "course" (title, description, date, time, duration, max_participants, teacher_id) VALUES
('Yoga Matinal', 'Séance de yoga pour bien démarrer la journée', CURRENT_DATE + INTERVAL '10 days', '08:00:00', '1 hour'::INTERVAL, 10, 2),
('Cours de Boxe', 'Initiation aux bases de la boxe', CURRENT_DATE + INTERVAL '11 days', '18:00:00', '1 hour 30 minutes'::INTERVAL, 15, 2);

-- Insertion des réservations
INSERT INTO "course_User_Reservation" (course_id, user_id) VALUES
(1, 1), -- Alice réserve Yoga Matinal
(2, 1), -- Alice réserve Cours de Boxe
(2, 4); -- David réserve Cours de Boxe

COMMIT;
