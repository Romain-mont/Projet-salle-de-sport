# MLD

---

On nomme les tables de liaisons en fonction des tables qu'elles représentent, et dans l'ordre alphabétique du nom des tables.

UTILISATEUR: 
- id_utilisateur (PK)
- nom
- prenom
- email
- mot_de_passe
- role (visiteur, abonné, professeur, administrateur)
- id_abonnement (FK vers ABONNEMENT, nullable)

ABONNEMENT: 
- id_abonnement (PK)
- type (mensuel/annuel/sans engagement)
- prix
- date_debut
- date_fin

COURS: 
- id_cours (PK)
- titre
- description
- date
- heure
- duree
- nombre_max_participants
- id_professeur (FK vers UTILISATEUR)

RESERVATION: 
- id_reservation (PK)
- id_utilisateur (FK vers UTILISATEUR)
- id_cours (FK vers COURS)
- date_reservation

UTILISATEUR souscrit à 0,1 ABONNEMENT  
ABONNEMENT est souscrit par 0,N UTILISATEUR  

UTILISATEUR réserve 0,N COURS via RESERVATION  
COURS est réservé par 0,N UTILISATEUR via RESERVATION  

COURS est animé par 1,1 PROFESSEUR (UTILISATEUR)  
PROFESSEUR anime 0,N COURS (UTILISATEUR)

---
