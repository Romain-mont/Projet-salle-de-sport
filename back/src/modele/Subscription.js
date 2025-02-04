import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

class Subscription extends Model {}

Subscription.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 10, // Le prix doit être supérieur ou égal à 10
            },
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isAfterStart(value) {
                    if (value <= this.start_date) {
                        throw new Error("La date de fin doit être postérieure à la date de début.");
                    }
                },
            },
        },
    },
    {
        sequelize,
        modelName: "Subscription",
        tableName: "subscription",
        timestamps: true, // Active les colonnes created_at et updated_at
    }
);

export default Subscription;
