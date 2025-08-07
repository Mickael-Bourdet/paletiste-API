import sequelize from "./client-sequelize.js";
import { DataTypes, Model } from "sequelize";
import { slugifyWithComponents } from "../utils/eventFormatters.js";

export class Event extends Model {}

Event.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
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

// Sequelize hook: generate slug from category, organizer and date
Event.beforeValidate(async (event, options) => {
  if (!event.slug) {
    // get the category from the event
    const category = await event.getCategory();
    if (category && event.organizer && event.date) {
      event.slug = slugifyWithComponents(
        category.name,
        event.organizer,
        event.date
      );
    }
  }
});

// Test
// const event = await Event.findAll();
// console.log(event);
