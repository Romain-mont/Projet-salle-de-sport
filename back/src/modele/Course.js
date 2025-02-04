import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js"; 


class Course extends Model {}

Course.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isAfterNow(value) {
                    if (new Date(value) <= new Date()) {
                        throw new Error("La date du cours doit être dans le futur.");
                    }
                },
            },
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1, // La durée doit être au moins de 1 minute
            },
        },
        max_participants: {
            type: DataTypes.INTEGER,
            allowNull: true, // Peut être NULL si aucun maximum n'est défini
            validate: {
                min: 1, // Le nombre de participants doit être au moins de 1
            },
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            },
            onDelete: "CASCADE"
        }
    },
    {
        sequelize,
        modelName: "Course",
        tableName: "course",
        timestamps: true
    }
);



export default Course;