# Le MCD

## Définition de MCD
Le **Modèle Conceptuel de Données (MCD)** décrit les données nécessaires au système d’information, indépendamment des choix techniques d’implémentation.

## Objectif du MCD
Créer une structure conceptuelle pour gérer les **utilisateurs**, les **abonnements**, et les **cours**, ainsi que la relation entre ces derniers dans une plateforme de gestion pour une salle de sport.

## Projet : Plateforme de gestion pour une salle de sport


## Entités et relations

### Entité : UTILISATEUR
**Attributs :**
- `code_utilisateur`
- `nom`
- `prenom`
- `email`
- `mot_de_passe`
- `role` (visiteur, abonné, professeur, administrateur)
- `code_abonnement` 

---

### Entité : ABONNEMENT
**Attributs :**
- `code_abonnement`
- `type` (mensuel/annuel/sans engagement)
- `prix`
- `date_debut`
- `date_fin`

---

### Entité : COURS
**Attributs :**
- `code_cours`
- `titre`
- `description`
- `date`
- `heure`
- `duree`
- `code_professeur`

---

### Entité : RESERVATION (Table de liaison)
**Attributs :**
- `code_reservation`
- `code_utilisateur` 
- `code_cours`
- `date_reservation`

---

### Relations

1. **UTILISATEUR et ABONNEMENT**
   - **Relation : SOUSCRIT**
   - Un utilisateur peut souscrire à **un seul abonnement maximum** (`0,1` côté UTILISATEUR).
   - Un abonnement peut être souscrit par plusieurs utilisateurs (`0,N` côté ABONNEMENT).
   - *Exemple :* Plusieurs utilisateurs peuvent souscrire à un abonnement annuel, mais un utilisateur ne peut pas avoir à la fois un abonnement mensuel et annuel.

2. **UTILISATEUR et COURS (via RESERVATION)**
   - **Relation : RESERVE**
   - Un utilisateur peut réserver plusieurs cours (`0,N` côté UTILISATEUR).
   - Un cours peut être réservé par plusieurs utilisateurs (`0,N` côté COURS).
   - Une table de liaison **RESERVATION** est nécessaire pour gérer cette relation N:N.

3. **COURS et PROFESSEUR**
   - Relation représentée par l’attribut `code_professeur` dans l’entité COURS.
   - Un cours est animé par un seul professeur (`1,1` côté PROFESSEUR).
   - Un professeur peut animer plusieurs cours (`0,N` côté UTILISATEUR avec rôle = professeur).

---

## Résumé des cardinalités
| Relation                  | Cardinalité côté A       | Cardinalité côté B       |
|---------------------------|--------------------------|--------------------------|
| UTILISATEUR – ABONNEMENT  | 0,1 (UTILISATEUR)        | 0,N (ABONNEMENT)         |
| UTILISATEUR – RESERVATION | 0,N (UTILISATEUR)        | 1,1 (RESERVATION)        |
| COURS – RESERVATION       | 0,N (COURS)              | 0,N (RESERVATION)        |
| COURS – PROFESSEUR        | 0,N (PROFESSEUR)         | 1,1 (COURS)              |

---

