import { sequelize, Tag, Event, Category } from "../models/associations.js";

async function seedDatabase() {
  try {
    console.log("---");

    // sync models with database
    await sequelize.sync({ force: true });
    console.log("Base de donnée synchronisée ✅");
    console.log("Data inserted:");

    // Create categories
    const categoryData = [{ name: "Fonte" }, { name: "Laiton" }, { name: "Bois" }, { name: "Terre" }];
    const categories = await Category.bulkCreate(categoryData);
    console.log(categoryData.length, "Categories ");

    // Create Tags
    const tagData = [{ name: "Club" }, { name: "Mix" }, { name: "Individuel" }, { name: "Doublette" }, { name: "Triplette" }, { name: "CDF" }];

    const tags = await Tag.bulkCreate(tagData);
    console.log(tagData.length, "Categories ");

    const eventData = [
      {
        title: "Concours du Palet Amical Froidfondais 2025",
        slug: "palet-amical-froidfondais",
        organizer: "Palet Amical Froidfondais",
        poster: "url",
        location: "salle Pierrefite Nestalas",
        date: "2025-04-26",
        description: "",
        registration_time: "14:30",
        start_time: "15:00",
        reservation: "0607080910",
        price: 10,
        credit_card: false,
      },
    ];
    const events = await Event.bulkCreate(eventData);
    console.log(tagData.length, "Concours ");

    // add category to event

    await events[0].setCategory(categories[0]);

    // join table Event <--> Tag
    const eventTagAssociation = [
      { event_id: 1, tag_id: 1 },
      { event_id: 1, tag_id: 3 },
    ];

    await sequelize.models.event_has_tag.bulkCreate(eventTagAssociation);
  } catch (error) {
    console.error("Erreur lors du seeding :", error);
  } finally {
    console.log("---");
    console.log("\n✅ Seeding done!\n");

    // Fermer la connexion à la base de données
    await sequelize.close();
  }
}

seedDatabase();
