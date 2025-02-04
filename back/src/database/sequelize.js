import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgres://sport:sport@localhost/sport", {
    dialect: "postgres",
    define: {
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscored: true,
    },
    dialectOptions: {
        multipleStatements: true,
    },
    
});


export { sequelize };