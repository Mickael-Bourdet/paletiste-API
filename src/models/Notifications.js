import { DataTypes, Model } from "sequelize";
import sequelize from "./client-sequelize.js";

export class Notification extends Model {}

Notification.init(
  {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "notification",
  }
);
