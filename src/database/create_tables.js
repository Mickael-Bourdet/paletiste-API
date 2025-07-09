import sequelize from "../models/client-sequelize.js";

async function createTables() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion OK");

    await sequelize.sync({ force: true });
    console.log("✅ Base de données synchronisée");
  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
  }
}

createTables();
