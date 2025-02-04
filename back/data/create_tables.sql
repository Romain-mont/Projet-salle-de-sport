BEGIN;

-- Suppression des tables dans le bon ordre
DROP TABLE IF EXISTS "course_User_Reservation";
DROP TABLE IF EXISTS "course";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "subscription";

-- Création de la table Subscription
CREATE TABLE "subscription" (
  id                SERIAL PRIMARY KEY,
  type              TEXT NOT NULL, -- Type d'abonnement : mensuel, annuel, etc.
  price             NUMERIC(10, 2) NOT NULL, -- Prix de l'abonnement
  start_date        DATE NOT NULL, -- Date de début de l'abonnement
  end_date          DATE NOT NULL, -- Date de fin de l'abonnement
  created_at        TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Date de création
  updated_at        TIMESTAMPTZ -- Date de mise à jour
);

-- Création de la table Users
CREATE TABLE "users" (
  id                SERIAL PRIMARY KEY,
  first_name        TEXT NOT NULL, -- Prénom de l'utilisateur
  last_name         TEXT NOT NULL, -- Nom de l'utilisateur
  email             TEXT NOT NULL UNIQUE, -- Email unique
  password          TEXT NOT NULL, -- Mot de passe
  role              TEXT CHECK (role IN ('subscriber', 'teacher', 'admin', 'visitor')) DEFAULT 'visitor',  
  subscription_id   INTEGER REFERENCES "subscription"(id) ON DELETE SET NULL, -- Clé étrangère vers Subscription (nullable)
  created_at        TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Date de création
  updated_at        TIMESTAMPTZ -- Date de mise à jour
);

-- Création de la table Course
CREATE TABLE "course" (
  id                SERIAL PRIMARY KEY,
  title             TEXT NOT NULL, -- Titre du cours
  description       TEXT, -- Description du cours
  date              DATE NOT NULL, -- Date du cours
  time              TIME NOT NULL, -- Heure du cours
  duration          INTERVAL NOT NULL, -- Durée du cours
  max_participants  INTEGER CHECK (max_participants > 0), -- Nombre maximum de participants
  teacher_id        INTEGER NOT NULL REFERENCES "users"(id) ON DELETE CASCADE, -- Clé étrangère vers Users (professeur)
  created_at        TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Date de création
  updated_at        TIMESTAMPTZ -- Date de mise à jour
);

-- Création de la table Course_User_Reservation (table d'association)
CREATE TABLE "course_User_Reservation" (
  id                SERIAL PRIMARY KEY,
  reservation_date  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Date de réservation du cours par l'utilisateur
  course_id         INTEGER NOT NULL REFERENCES "course"(id) ON DELETE CASCADE, -- Clé étrangère vers Course
  user_id           INTEGER NOT NULL REFERENCES "users"(id) ON DELETE CASCADE, -- Clé étrangère vers Users (abonné)
  created_at        TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Date de création
  updated_at        TIMESTAMPTZ -- Date de mise à jour
);

COMMIT;
