BEGIN;

-- Insertion des abonnements
INSERT INTO "subscription" (type, price, start_date, end_date) VALUES
('mensuel', 29.99, CURRENT_DATE, CURRENT_DATE + INTERVAL '1 month'),
('annuel', 299.99, CURRENT_DATE, CURRENT_DATE + INTERVAL '1 year'),
('sans engagement', 40.00, CURRENT_DATE, CURRENT_DATE + INTERVAL '1 month');


-- Insertion des utilisateurs
INSERT INTO "users" (first_name, last_name, email, password, role, subscription_id) VALUES
('Alice', 'Dupont', 'alice.dupont@example.com', 'testpassword1', 'subscriber', 1),
('Bob', 'Martin', 'bob.martin@example.com', 'testpassword2', 'teacher', NULL),
('Charlie', 'Durand', 'charlie.durand@example.com', 'testpassword3', 'admin', NULL),
('David', 'Lemoine', 'david.lemoine@example.com', 'testpassword4', 'subscriber', 2);

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
