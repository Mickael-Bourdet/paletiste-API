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
      { name: "Association" },
      { name: "École" },
      { name: "Individuel" },
      { name: "Doublette" },
      { name: "Triplette" },
      { name: "CDF" },
      { name: "Open" },
      { name: "Seniors" },
      { name: "2 palets" },
      { name: "3 palets" },
      { name: "85" },
      { name: "44" },
      { name: "49" },
      { name: "17" },
      { name: "79" },
    ];

    await Tag.bulkCreate(tagData);
    console.log(tagData.length, "Tags ");

    const eventData = [
      {
        title: "Concours la Boissière de Montaigu 2025",
        organizer: "Palet club boisserien",
        poster: "/uploads/seeding/la_boissière_montaigu.jpg",
        location: "salle omnisports",
        date: "2025-09-20",
        description:
          "Concours du club de la Boissière de Montaigu, fonte sur plomb en doublette",
        registration_time: "13:30",
        start_time: "14:30",
        reservation: "Réservation sur Helloasso en scannant le QR code",
        nb_team: 128,
        price: 16,
        credit_card: true,
        status: "approved",
      },
      {
        organizer: "Association Villenfolie",
        poster: "/uploads/seeding/Nanteuil_79.jpg",
        location: "Stade Municipal",
        date: "2025-09-05",
        description: "Un lot à chaque participant",
        start_time: "19:30",
        reservation: "0602525255",
        price: 14,
        credit_card: false,
      },
      {
        title: "Concours palet Fonte sur plomb",
        organizer: "Palet club Melletois",
        poster: "/uploads/seeding/la_meilleraie_tillay.jpg",
        location: "Complexe sportif de la Meilleraie Tillay",
        date: "2025-09-06",
        registration_time: "13:30",
        start_time: "14:30",
        reservation:
          "Renseignement et pré-inscription par SMS avant le 29 août auprès de Chris : 0750009381",
        price: 16,
        credit_card: false,
        status: "approved",
      },
      {
        organizer: "L'amicale Palet Garnachoise",
        poster: "/uploads/seeding/la_garnache.jpg",
        location: "Salle du Genet 85670 La Garnache",
        date: "2025-09-13",
        registration_time: "13:30",
        start_time: "15:00",
        reservation: "Sur pré-inscription au 0617957391 ou sur place",
        price: 16,
        credit_card: true,
        status: "approved",
      },
      {
        title: "32eme Coupe de France de palet fonte sur plomb en doublette",
        organizer: "FNSMR",
        poster: "/uploads/seeding/CDF_fonte_2024.jpg",
        location: "Salle du grand palais à Challans",
        date: "2025-05-30",
        registration_time: "8:30",
        start_time: "9:00",
        reservation:
          "Pré-inscriptions obligatoires avant le 10 mai 2025, inscriptions en ligne : www.le-palet.com",
        price: 6,
        credit_card: true,
        status: "approved",
      },
      {
        title: "Open régional Féminin",
        organizer: "FNSMR",
        poster: "/uploads/seeding/Affiche-Open-Regional-Palet-Feminin-2024.jpg",
        location: "Complexe sportif de la Ferrière",
        date: "2025-03-07",
        description: "Ouvert à toutes",
        start_time: "14:00",
        reservation: "inscriptions en ligne : www.le-palet.com",
        price: 6,
        credit_card: true,
      },
      {
        organizer: "Palet fonte Montlimartois",
        poster: "/uploads/seeding/saint_pierre_montlimart_49.jpg",
        location: "salle de sports de Saint Pierre Montlimart",
        date: "2025-08-30",
        description:
          "Concours du club de Saint Pierre Montlimart, fonte sur plomb en doublette, 1 lot pour tous et première équipe féminine récompensée",
        start_time: "13:30",
        reservation: "0689077391 avant le 16/08/2025",
        price: 16,
        credit_card: false,
        status: "approved",
      },
      {
        organizer: "LPPC Marsais & plaisir compétition",
        poster: "/uploads/seeding/saint_george_du_bois_17.jpg",
        location:
          "Centre équestre les cavaliers du plaisir Le plaisir 17700 Saint Georges du bois",
        date: "2025-08-30",
        registration_time: "09:00",
        start_time: "10:00",
        reservation:
          "Virginie : 0687851472, Delphine : 0660919205 ou par mail : plaisircompetition@gmail.com",
        nb_team: 48,
        price: 16,
        credit_card: true,
      },
      {
        organizer: "LPPC Marsais & plaisir compétition",
        poster: "/uploads/seeding/saint_george_du_bois_17.jpg",
        location:
          "Centre équestre les cavaliers du plaisir Le plaisir 17700 Saint Georges du bois",
        date: "2025-08-30",
        registration_time: "09:00",
        start_time: "10:00",
        reservation:
          "Virginie : 0687851472, Delphine : 0660919205 ou par mail : plaisircompetition@gmail.com",
        nb_team: 48,
        price: 16,
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
