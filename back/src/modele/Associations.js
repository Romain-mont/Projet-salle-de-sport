import { Users } from "./Users.js";
import Course from "./Course.js";
import Subscription from "./Subscription.js";
import CourseUserReservation from "./Course_User_Reservation.js";

// Relation UTILISATEUR ↔ COURS (Professeur)
Users.hasMany(Course, { 
    as: "courses_given",
    foreignKey: "teacher_id", 
    onDelete: "CASCADE" 
});

Course.belongsTo(Users, { 
    as: "teacher",
    foreignKey: "teacher_id" 
});

// Relation UTILISATEUR ↔ ABONNEMENT
Subscription.hasMany(Users, { 
    as: "subscribers", // Alias pour accéder aux utilisateurs souscrivant à cet abonnement
    foreignKey: "subscription_id", 
    onDelete: "SET NULL" 
});

Users.belongsTo(Subscription, { 
    as: "subscription", // Alias pour accéder à l'abonnement d'un utilisateur
    foreignKey: "subscription_id", 
    onDelete: "SET NULL" 
});


// Relation UTILISATEUR ↔ COURS via RESERVATION
Users.belongsToMany(Course, { 
    as: "reserved_courses",
    through: CourseUserReservation, 
    foreignKey: "user_id" // Clé étrangère vers UTILISATEUR
});

Course.belongsToMany(Users, { 
    as: "participants",
    through: CourseUserReservation,
    foreignKey: "course_id" // Clé étrangère vers COURS
});



export { Users, Course, Subscription, CourseUserReservation };