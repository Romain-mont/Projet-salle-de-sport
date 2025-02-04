import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";
import Subscription from "./Subscription.js";

class Users extends Model {}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("subscriber", "teacher", "admin", "visitor"),
            defaultValue: "visitor",
            allowNull: false,
        },
        subscription_id: {
            type: DataTypes.INTEGER,
            allowNull: true, // Un utilisateur peut ne pas avoir d'abonnement
            references: {
                model: Subscription, // Nom du modèle cible
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "Users",
        tableName: "users",
        timestamps: true,
    }
);

export { Users };
