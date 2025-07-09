import { DataTypes, Model } from "sequelize";
import sequelize from "./client-sequelize.js";

export class Tag extends Model {}

Tag.init(
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  { sequelize, tableName: "tag" }
);
