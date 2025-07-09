import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    underscored: true, // userId becomes user_id
    timestamps: false,
  },

  logging: false, // disable logs in console
});

export default sequelize;

// Test connection
// try {
//   await sequelize.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }
