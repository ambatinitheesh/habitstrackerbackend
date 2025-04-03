const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Habit = sequelize.define("Habit", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING, // e.g., "Exercise", "Reading", "Meditation"
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN, // true (completed), false (pending)
        defaultValue: false,
    },
});

sequelize.sync({}) // Creates the table if it doesn't exist
    .then(() => console.log("✅ Habits table created"))
    .catch((err) => console.error("❌ Error creating table:", err));

module.exports = Habit;
