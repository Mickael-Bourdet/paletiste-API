import { DataTypes, Model } from "sequelize";
import sequelize from "./client-sequelize.js";

export class Category extends Model {}

Category.init({
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  sequelize,
  tableName: "category",
});
