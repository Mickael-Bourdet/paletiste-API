import { DataTypes, Model } from "sequelize";
import sequelize from "./client-sequelize.js";

export class RefreshToken extends Model {}

RefreshToken.init(
  {
    jti: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    device: {
      type: DataTypes.string,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "refresh_token",
    timestamps: true,
  }
);
