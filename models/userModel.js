const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define("User", {
id: {
type: DataTypes.INTEGER,
autoIncrement: true,
primaryKey: true,
}, 
name: {
type: DataTypes.STRING,
allowNull: false,
},
email: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
},
age: {
type: DataTypes.INTEGER,
},
password:{
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
},
});

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

sequelize.sync({ force: false ,alter:true}) // Creates table if not exists
.then(() => console.log("User table created"))
.catch((err) => console.error(" Error creating table:", err));
module.exports = User;