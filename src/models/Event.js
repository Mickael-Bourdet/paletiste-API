import sequelize from "./client-sequelize.js";
import { DataTypes, Model } from "sequelize";

export class Event extends Model {}

Event.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eventType: {
      type: DataTypes.ENUM(
        "concours",
        "open",
        "femme",
        "CDF",
        "jeunes",
        "seniors"
      ),
      allowNull: false,
    },
    organizer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizerType: {
      type: DataTypes.ENUM("club", "association", "federation"),
      allowNull: false,
    },
    poster: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    registrationTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    reservation: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    maxTeams: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    teamType: {
      type: DataTypes.ENUM("individuel", "doublette", "triplette"),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creditCard: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "event",
  }
);
// Test
// const event = await Event.findAll();
// console.log(event);
