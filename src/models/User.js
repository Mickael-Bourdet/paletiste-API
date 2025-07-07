import sequelize from "./client-sequelize.js";
import { DataTypes, Model } from "sequelize";

export class User extends Model {}

User.init(
  {
    pseudo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    tableName: "user",
  }
);
