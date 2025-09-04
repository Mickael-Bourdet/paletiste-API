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
      { name: "École" },
      { name: "Caritatif" },
      { name: "2 palets" },
      { name: "3 palets" },
    ];

    await Tag.bulkCreate(tagData);
    console.log(tagData.length, "Tags ");

    const eventData = [
      {
        // title: "Concours la Boissière de Montaigu 2025",
        eventType: "concours",
        organizer: "Palet club boisserien",
        organizerType: "club",
        poster: "/uploads/seeding/la_boissiere_montaigu.jpg",
        streetAddress: "Salle omnisport",
        postalCode: "85600",
        city: "La Boissière de Montaigu",
        date: "2025-09-20",
        description:
          "Concours du club de la Boissière de Montaigu, fonte sur plomb en doublette",
        registrationTime: "13:30",
        startTime: "14:30",
        reservation: [
          {
            type: "url",
            label: "HelloAsso",
            value: "https://www.helloasso.com/inscriptions",
          },
          {
            type: "info",
            value: "Scanner le QR Code sur l'affiche",
          },
        ],
        maxTeams: 128,
        teamType: "doublette",
        price: 8,
        creditCard: true,
        // status: "approved",
      },
      {
        eventType: "concours",
        organizer: "Association Villenfolie",
        organizerType: "association",
        poster: "/uploads/seeding/Nanteuil_79.jpg",
        streetAddress: "Stade Municipal",
        postalCode: "79400",
        city: "Nanteuil",
        date: "2025-09-05",
        description: "Un lot à chaque participant",
        startTime: "19:30",
        reservation: [{ type: "phone", value: "0602525255" }],
        teamType: "doublette",
        price: 7,
        creditCard: false,
      },
      {
        // title: "Concours palet Fonte sur plomb",
        eventType: "concours",
        organizer: "Palet club Melletois",
        organizerType: "club",
        poster: "/uploads/seeding/la_meilleraie_tillay.jpg",
        streetAddress: "Complexe sportif",
        postalCode: "85140",
        city: "La Meilleraie-Tillay",
        date: "2025-09-06",
        registrationTime: "13:30",
        startTime: "14:30",
        reservation: [
          {
            type: "phone",
            label: "Chris",
            value: "0750009381",
          },
          {
            type: "info",
            value: "Renseignement et pré-inscription par SMS avant le 29 août",
          },
        ],
        teamType: "doublette",
        price: 8,
        creditCard: false,
        // status: "approved",
      },
      {
        eventType: "concours",
        organizer: "L'amicale Palet Garnachoise",
        organizerType: "club",
        poster: "/uploads/seeding/la_garnache.jpg",
        streetAddress: "Salle du Genet",
        postalCode: "85670",
        city: "La Garnache",
        date: "2025-09-13",
        registrationTime: "13:30",
        startTime: "15:00",
        reservation: [
          {
            type: "phone",
            value: "0617957391",
          },
          {
            type: "info",
            value: "Sur pré-inscription sur place",
          },
        ],
        teamType: "doublette",
        price: 8,
        creditCard: true,
        // status: "approved",
      },
      {
        title: "34eme Coupe de France de palet fonte sur plomb en doublette",
        eventType: "CDF",
        organizer: "FNSMR",
        organizerType: "federation",
        poster: "/uploads/seeding/CDF_fonte_2026.jpg",
        streetAddress: "Salle de la Demoiselle",
        postalCode: "85500",
        city: "Challans",
        date: "2026-05-30",
        registrationTime: "8:30",
        startTime: "9:00",
        reservation: [
          {
            type: "info",
            value: "Pré-inscriptions obligatoires avant le 10 mai 2026",
          },
          {
            type: "url",
            label: "Site officiel",
            value: "https://www.le-palet.com",
          },
        ],
        teamType: "doublette",
        price: 6,
        creditCard: true,
        // status: "approved",
      },
      {
        // title: "Open régional Féminin",
        eventType: "open",
        organizer: "FNSMR",
        organizerType: "federation",
        poster: "/uploads/seeding/Affiche-Open-Regional-Palet-Feminin-2024.jpg",
        streetAddress: "Complexe sportif",
        postalCode: "85089",
        city: "La Ferrière",
        date: "2026-03-07",
        description: "Ouvert à toutes",
        startTime: "14:00",
        reservation: [
          {
            type: "url",
            label: "Site officiel",
            value: "https://www.le-palet.com",
          },
        ],
        teamType: "individuel",
        price: 6,
        creditCard: true,
      },
      {
        eventType: "concours",
        organizer: "Palet fonte Montlimartois",
        organizerType: "club",
        poster: "/uploads/seeding/saint_pierre_montlimart_49.jpg",
        streetAddress: "salle de sports",
        postalCode: "49110",
        city: "Saint-Pierre-Montlimart",
        date: "2026-08-30",
        description:
          "Concours du club de Saint Pierre Montlimart, fonte sur plomb en doublette, 1 lot pour tous et première équipe féminine récompensée",
        startTime: "13:30",
        reservation: [
          {
            type: "info",
            value: "Pré-inscriptions avant le 16/08/2026",
          },
          {
            type: "phone",
            value: "0689077391",
          },
        ],
        teamType: "doublette",
        price: 8,
        creditCard: false,
        // status: "approved",
      },
      {
        eventType: "concours",
        organizer: "LPPC Marsais & plaisir compétition",
        organizerType: "association",
        poster: "/uploads/seeding/saint_george_du_bois_17.jpg",
        streetAddress: "Centre équestre les cavaliers du plaisir Le plaisir",
        postalCode: "17700",
        city: "Saint Georges du bois",
        date: "2025-08-30",
        registrationTime: "09:00",
        startTime: "10:00",
        reservation: [
          { type: "phone", label: "Virginie", value: "0687851472" },
          { type: "phone", label: "Delphine", value: "0660919205" },
          { type: "email", value: "plaisircompetition@gmail.com" },
        ],
        maxTeams: 48,
        teamType: "doublette",
        price: 8,
        creditCard: true,
      },
      {
        eventType: "concours",
        organizer: "Palet club Herbignacais",
        organizerType: "club",
        poster: "/uploads/seeding/herbignac_44.jpg",
        streetAddress: "Salle oceane",
        postalCode: "44410",
        city: "Herbignac",
        date: "2026-09-13",
        registrationTime: "12:00",
        startTime: "13:00",
        reservation: [
          {
            type: "url",
            label: "HelloAsso",
            value: "https://www.helloasso.com/inscriptions",
          },
          {
            type: "info",
            value: "Scanner le QR Code sur l'affiche",
          },
        ],
        maxTeams: 72,
        teamType: "doublette",
        price: 8,
        creditCard: true,
      },
      {
        eventType: "concours",
        organizer: "Amical Pétanque Le Fenouiller & Palets Vie Le Fenouiller",
        organizerType: "club",
        poster: "/uploads/seeding/fenouiller_mixte.jpg",
        streetAddress: "Boulodrome",
        postalCode: "85800",
        city: "Le Fenouiller",
        date: "2026-07-27",
        description: "Biathlon palet & pétanque",
        registrationTime: "13:30",
        startTime: "14:00",
        reservation: [{ type: "phone", value: "06 00 00 00 01" }],
        teamType: "doublette",
        price: 8,
        creditCard: false,
        // status: "approved",
      },
      {
        eventType: "concours",
        organizer: "Palet Terre Garnachois",
        organizerType: "association",
        poster: "/uploads/seeding/la_garnache_terre.jpg",
        streetAddress: "Terrain de la gare",
        postalCode: "85670",
        city: "La Garnache",
        date: "2026-06-06",
        registrationTime: "14:00",
        startTime: "15:00",
        reservation: [
          {
            type: "phone",
            value: "0613877456",
          },
        ],
        teamType: "doublette",
        price: 9,
        // status: "approved",
      },
      {
        eventType: "concours",
        organizer: "Un Rayon de soleil pour nos p'tits guerriers",
        organizerType: "association",
        poster: "/uploads/seeding/plourivo_22.jpg",
        streetAddress: "Stade de foot",
        postalCode: "22860",
        city: "Plourivo",
        date: "2026-09-06",
        startTime: "10:00",
        reservation: [
          {
            type: "phone",
            value: "0628519727",
          },
        ],
        teamType: "doublette",
        price: 10,
        // status: "approved",
      },
      {
        eventType: "seniors",
        organizer: "CDSMR & Palet Club Chavagnais",
        organizerType: "federation",
        poster: "/uploads/seeding/tournoi-seniors.jpg",
        streetAddress: "Salle Emeraude, rue des rosiers",
        postalCode: "85250",
        city: "Chavagnes-en-Paillers",
        date: "2026-04-21",
        description: "Réservé aux licencié(e)s CDSMR 85 né avant le 1/01/1969",
        startTime: "14:00",
        reservation: [
          {
            type: "url",
            label: "HelloAsso",
            value: "https://www.helloasso.com/inscriptions",
          },
        ],
        teamType: "individuel",
        price: 8,
        // status: "approved",
      },
      {
        eventType: "jeunes",
        organizer: "FNSMR & AEJP",
        organizerType: "federation",
        poster: "/uploads/seeding/coupe_jeune.jpg",
        streetAddress: "Salle omnisports",
        postalCode: "85140",
        city: "Les Essarts",
        date: "2025-10-25",
        description: "Ouvert à tous - Licencié(e) ou non à la FNSMR",
        startTime: "13:30",
        reservation: [
          {
            type: "url",
            label: "HelloAsso",
            value: "https://www.helloasso.com/inscriptions",
          },
        ],
        teamType: "doublette",
        price: 8,
        creditCard: true,
        // status: "approved",
      },
    ];
    const events = await Event.bulkCreate(eventData, { individualHooks: true });
    console.log(tagData.length, "Concours ");

    // add category to event
    const eventCategoryMap = {
      0: categories[0],
      1: categories[0],
      2: categories[0],
      3: categories[0],
      4: categories[0],
      5: categories[0],
      6: categories[0],
      7: categories[0],
      8: categories[1],
      9: categories[4],
      10: categories[3],
      11: categories[2],
      12: categories[0],
      13: categories[0],
    };

    for (const [index, category] of Object.entries(eventCategoryMap)) {
      await events[index].setCategory(category);
    }

    // join table Event <--> Tag
    const eventTagAssociation = [
      { event_id: 1, tag_id: 4 }, //Boissiere
      { event_id: 2, tag_id: 4 }, // Nanteuil
      { event_id: 3, tag_id: 4 }, // Meilleraie
      { event_id: 4, tag_id: 4 }, // La garnache
      { event_id: 5, tag_id: 4 }, // CDF
      { event_id: 6, tag_id: 4 }, // open feminin
      { event_id: 7, tag_id: 4 }, // Saint pierre Montlimart
      { event_id: 8, tag_id: 4 }, // Saint George du bois
      { event_id: 9, tag_id: 4 }, // Herbignac
      { event_id: 10, tag_id: 4 }, // Fenouiller mixte
      { event_id: 11, tag_id: 4 }, // Terre la garnache
      { event_id: 12, tag_id: 4 }, // Plourivo
      { event_id: 13, tag_id: 4 }, // Séniors
      { event_id: 14, tag_id: 4 }, // Jeunes
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
