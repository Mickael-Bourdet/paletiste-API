import sequelize from "./client-sequelize.js";
import { DataTypes, Model } from "sequelize";
import { slugify } from "../utils/eventFormatters.js";

export class Event extends Model {}

Event.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    organizer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    registration_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    reservation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    credit_card: {
      type: DataTypes.BOOLEAN,
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

// Sequelize hook: generate slug from title if not provided
Event.beforeValidate((event, options) => {
  // if there is a title and no slug, generate the slug automatically
  if (event.title && !event.slug) {
    event.slug = slugify(event.title);
  }
});

// Test
// const event = await Event.findAll();
// console.log(event);
