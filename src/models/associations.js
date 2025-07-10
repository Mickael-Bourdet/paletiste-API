import sequelize from "./client-sequelize.js";
import { Event } from "./Event.js";
import { Tag } from "./Tag.js";
import { User } from "./User.js";
import { Category } from "./Category.js";
import { Notification } from "./Notifications.js";

// Category <--> Event
Category.hasMany(Event, {
  foreignKey: "category_id",
  as: "events",
});

Event.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

// User <--> Event

User.hasMany(Event, {
  foreignKey: "user_id",
  as: "events",
});

Event.belongsTo(User, {
  foreignKey: "user_id",
  as: "author",
});

// tag <--> Event
Event.belongsToMany(Tag, {
  through: "event_has_tag",
  as: "tags",
  foreignKey: "event_id",
  otherKey: "tag_id",
});

Tag.belongsToMany(Event, {
  through: "event_has_tag",
  as: "events",
  foreignKey: "tag_id",
  otherKey: "event_id",
});

// User <--> Event
Event.belongsToMany(User, {
  through: "user_follows_event",
  as: "user_bookmarked_event",
  foreignKey: "event_id",
  otherKey: "user_id",
});

User.belongsToMany(Event, {
  through: "user_follows_event",
  as: "event_is_bookmarked",
  foreignKey: "user_id",
  otherKey: "event_id",
});

// User <--> Notification
User.belongsToMany(Notification, {
  through: "user_has_notification",
  as: "user_unread_message",
  foreignKey: "event_id",
  otherKey: "notification_id",
});

Notification.belongsToMany(User, {
  through: "user_has_notification",
  as: "notification_is_send",
  foreignKey: "notification_id",
  otherKey: "user_id",
});

export { Category, Event, Tag, User, Notification, sequelize };
