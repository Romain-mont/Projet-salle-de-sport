import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js"; 


class CourseUserReservation extends Model {}

CourseUserReservation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        reservation_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "course",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        user_id: {
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
        modelName: "CourseUserReservation",
        tableName: "course_User_Reservation",
        timestamps: true
    }
);


export default CourseUserReservation;