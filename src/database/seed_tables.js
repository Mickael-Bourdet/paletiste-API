import { sequelize, Tag, Event, Category } from "../models/associations.js";

async function seedDatabase() {
  try {
    console.log("---");

    // sync models with database
    await sequelize.sync({ force: true });
    console.log("Base de donnée synchronisée ✅");
    console.log("Data inserted:");

    // Create categories
    const categoryData = [
      { name: "Fonte" },
      { name: "Laiton" },
      { name: "Bois" },
      { name: "Terre" },
      { name: "Mixte" },
    ];
    const categories = await Category.bulkCreate(categoryData);
    console.log(categoryData.length, "Categories ");

    // Create Tags
    const tagData = [
      { name: "Club" },
      { name: "Individuel" },
      { name: "Doublette" },
      { name: "Triplette" },
      { name: "CDF" },
    ];

    await Tag.bulkCreate(tagData);
    console.log(tagData.length, "Tags ");

    const eventData = [
      {
        title: "Concours du Palet Amical Froidfondais 2025",
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
      {
        title: "Concours de Fonte 2025",
        organizer: "Club Fonte",
        poster: "url1",
        location: "Salle 1",
        date: "2025-01-10",
        description: "Tournoi de fonte",
        registration_time: "14:00",
        start_time: "15:00",
        reservation: "0600000001",
        price: 5,
        credit_card: true,
      },
      {
        title: "Laiton Open",
        organizer: "Team Laiton",
        poster: "url2",
        location: "Salle 2",
        date: "2025-02-20",
        description: "Compétition officielle",
        registration_time: "13:30",
        start_time: "14:00",
        reservation: "0600000002",
        price: 8,
        credit_card: false,
      },
      {
        title: "Bois Challenge",
        organizer: "Asso Bois",
        poster: "url3",
        location: "Salle 3",
        date: "2025-03-15",
        description: "Concours amateur",
        registration_time: "15:00",
        start_time: "15:30",
        reservation: "0600000003",
        price: 6,
        credit_card: true,
      },
      {
        title: "Terre Cup",
        organizer: "Terre Club",
        poster: "url4",
        location: "Salle 4",
        date: "2025-04-05",
        description: "Tournoi annuel",
        registration_time: "14:15",
        start_time: "14:45",
        reservation: "0600000004",
        price: 7,
        credit_card: false,
      },
      {
        title: "Grand Prix Mixte",
        organizer: "Mix Club",
        poster: "url5",
        location: "Grande Salle",
        date: "2025-05-10",
        description: "Ouvert à tous",
        registration_time: "13:45",
        start_time: "14:30",
        reservation: "0600000005",
        price: 10,
        credit_card: true,
      },
    ];
    const events = await Event.bulkCreate(eventData, { individualHooks: true });
    console.log(tagData.length, "Concours ");

    // add category to event
    const eventCategoryMap = {
      0: categories[0],
      1: categories[0],
      2: categories[1],
      3: categories[2],
      4: categories[3],
      5: categories[0],
    };

    for (const [index, category] of Object.entries(eventCategoryMap)) {
      await events[index].setCategory(category);
    }

    // join table Event <--> Tag
    const eventTagAssociation = [
      { event_id: 1, tag_id: 1 },
      { event_id: 1, tag_id: 3 },
      { event_id: 2, tag_id: 1 },
      { event_id: 3, tag_id: 2 },
      { event_id: 3, tag_id: 3 },
      { event_id: 4, tag_id: 4 },
      { event_id: 5, tag_id: 5 },
      { event_id: 5, tag_id: 1 },
      { event_id: 6, tag_id: 1 },
      { event_id: 6, tag_id: 5 },
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
