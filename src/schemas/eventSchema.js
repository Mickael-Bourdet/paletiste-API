import Joi from "joi";

// Helpers
const timePattern = /^\d{2}:\d{2}$/; // HH:mm

const reservationItem = Joi.object({
  type: Joi.string()
    .valid("phone", "email", "url", "info")
    .required()
    .messages({
      "any.only":
        "Le type de réservation doit être 'phone', 'email', 'url' ou 'info'",
      "any.required": "Le type de réservation est obligatoire",
    }),
  label: Joi.string().trim().max(100).optional(),
  value: Joi.alternatives()
    .try(Joi.string().trim().max(255), Joi.number())
    .required()
    .messages({ "any.required": "La valeur de réservation est obligatoire" }),
});

export const createEventSchema = Joi.object({
  title: Joi.string().trim().max(100).optional().messages({
    "string.base": "Le titre doit être une chaîne de caractères",
    "string.max": "Le titre doit contenir au plus 100 caractères",
  }),
  eventType: Joi.string()
    .valid("concours", "open", "coupe_de_France", "coupe_jeunes", "seniors")
    .required()
    .messages({
      "any.only":
        "Le type d'évènement doit être 'concours', 'open', 'coupe_de_France', 'coupe_jeunes' ou 'seniors'",
      "any.required": "Le type d'évènement est obligatoire",
    }),
  organizer: Joi.string().trim().min(3).max(100).required().messages({
    "string.base":
      "Le nom de l'organisateur doit être une chaîne de caractères",
    "string.empty": "Le nom de l'organisateur est obligatoire",
    "string.min":
      "Le nom de l'organisateur doit contenir au moins 3 caractères",
    "string.max":
      "Le nom de l'organisateur doit contenir au plus 100 caractères",
  }),
  organizerType: Joi.string()
    .valid("club", "association", "federation")
    .required()
    .messages({
      "any.only":
        "Le type d'organisateur doit être 'club', 'association' ou 'federation'",
      "any.required": "Le type d'organisateur est obligatoire",
    }),
  streetAddress: Joi.string().trim().min(3).max(255).required().messages({
    "string.base": "L'adresse doit être une chaîne de caractères",
    "string.empty": "L'adresse est obligatoire",
    "string.min": "L'adresse doit contenir au moins 3 caractères",
  }),
  postalCode: Joi.string()
    .length(5)
    .pattern(/^\d{5}$/)
    .required()
    .messages({
      "string.base": "Le code postal doit être une chaîne de 5 chiffres",
      "string.length": "Le code postal doit contenir 5 chiffres",
      "string.pattern.base":
        "Le code postal doit contenir uniquement des chiffres",
    }),
  city: Joi.string().trim().min(2).max(100).required().messages({
    "string.base": "La ville doit être une chaîne de caractères",
    "string.empty": "La ville est obligatoire",
  }),
  date: Joi.date()
    .min(new Date())
    .required()
    .max(new Date(new Date().getFullYear() + 1, 11, 31))
    .messages({
      "date.base": "La date doit être une date valide",
      "date.empty": "La date est obligatoire",
      "date.min": "La date doit être supérieure à la date actuelle",
      "date.max":
        "La date doit être inférieure à la date du 31 décembre de l'année prochaine",
    }),
  registrationTime: Joi.string().pattern(timePattern).optional().messages({
    "string.pattern.base": "L'heure d'inscription doit être au format HH:mm",
  }),
  startTime: Joi.string().pattern(timePattern).required().messages({
    "string.pattern.base": "L'heure de début doit être au format HH:mm",
    "string.empty": "L'heure de début est obligatoire",
  }),
  reservation: Joi.alternatives()
    .try(Joi.array().items(reservationItem).min(1), Joi.object())
    .required()
    .messages({
      "any.required": "Les informations de réservation sont obligatoires",
    }),
  maxTeams: Joi.number().integer().min(1).optional().messages({
    "number.base": "Le nombre maximum d'équipes doit être un entier",
    "number.min": "Le nombre maximum d'équipes doit être supérieur à 0",
  }),
  teamType: Joi.string()
    .valid("individuel", "doublette", "triplette")
    .required()
    .messages({
      "any.only":
        "Le type d'équipe doit être 'individuel', 'doublette' ou 'triplette'",
      "any.required": "Le type d'équipe est obligatoire",
    }),
  price: Joi.number().integer().min(0).required().messages({
    "number.base": "Le prix doit être un nombre entier",
    "number.empty": "Le prix est obligatoire",
    "number.min": "Le prix doit être supérieur ou égal à 0",
  }),
  creditCard: Joi.boolean().optional().messages({
    "boolean.base": "Le paiement par carte de crédit doit être un booléen",
  }),
  description: Joi.string().trim().min(10).max(1000).optional().messages({
    "string.base": "La description doit être une chaîne de caractères",
    "string.min": "La description doit contenir au moins 10 caractères",
    "string.max": "La description doit contenir au plus 1000 caractères",
  }),
  status: Joi.forbidden(), // défini par défaut côté modèle
}).unknown(true); // ignore "poster" téléchargé via multipart

export const updateEventSchema = Joi.object({
  title: Joi.string().trim().max(100).optional().messages({
    "string.base": "Le titre doit être une chaîne de caractères",
    "string.max": "Le titre doit contenir au plus 100 caractères",
  }),
  eventType: Joi.string()
    .valid("concours", "open", "coupe_de_France", "coupe_jeunes", "seniors")
    .optional()
    .messages({
      "any.only":
        "Le type d'évènement doit être 'concours', 'open', 'coupe_de_France', 'coupe_jeunes' ou 'seniors'",
    }),
  organizer: Joi.string().trim().min(3).max(100).optional().messages({
    "string.base":
      "Le nom de l'organisateur doit être une chaîne de caractères",
    "string.min":
      "Le nom de l'organisateur doit contenir au moins 3 caractères",
    "string.max":
      "Le nom de l'organisateur doit contenir au plus 100 caractères",
  }),
  organizerType: Joi.string()
    .valid("club", "association", "ecole", "federation")
    .optional()
    .messages({
      "any.only":
        "Le type d'organisateur doit être 'club', 'association', 'ecole' ou 'federation'",
    }),
  streetAddress: Joi.string().trim().min(3).max(255).optional().messages({
    "string.base": "L'adresse doit être une chaîne de caractères",
    "string.min": "L'adresse doit contenir au moins 3 caractères",
  }),
  postalCode: Joi.string()
    .length(5)
    .pattern(/^\d{5}$/)
    .optional()
    .messages({
      "string.base": "Le code postal doit être une chaîne de 5 chiffres",
      "string.length": "Le code postal doit contenir 5 chiffres",
      "string.pattern.base":
        "Le code postal doit contenir uniquement des chiffres",
    }),
  city: Joi.string().trim().min(2).max(100).optional().messages({
    "string.base": "La ville doit être une chaîne de caractères",
  }),
  date: Joi.date()
    .min(new Date())
    .max(new Date(new Date().getFullYear() + 1, 11, 31))
    .optional()
    .messages({
      "date.base": "La date doit être une date valide",
      "date.min": "La date doit être supérieure à la date actuelle",
      "date.max":
        "La date doit être inférieure à la date du 31 décembre de l'année prochaine",
    }),
  registrationTime: Joi.string().pattern(timePattern).optional().messages({
    "string.pattern.base": "L'heure d'inscription doit être au format HH:mm",
  }),
  startTime: Joi.string().pattern(timePattern).optional().messages({
    "string.pattern.base": "L'heure de début doit être au format HH:mm",
  }),
  reservation: Joi.alternatives()
    .try(Joi.array().items(reservationItem).min(1), Joi.object())
    .optional(),
  maxTeams: Joi.number().integer().min(1).optional().messages({
    "number.base": "Le nombre maximum d'équipes doit être un entier",
    "number.min": "Le nombre maximum d'équipes doit être supérieur à 0",
  }),
  teamType: Joi.string()
    .valid("individuel", "doublette", "triplette")
    .optional()
    .messages({
      "any.only":
        "Le type d'équipe doit être 'individuel', 'doublette' ou 'triplette'",
    }),
  price: Joi.number().integer().min(0).optional().messages({
    "number.base": "Le prix doit être un nombre entier",
    "number.min": "Le prix doit être supérieur ou égal à 0",
  }),
  creditCard: Joi.boolean().optional().messages({
    "boolean.base": "Le paiement par carte de crédit doit être un booléen",
  }),
  description: Joi.string().trim().min(10).max(1000).optional().messages({
    "string.base": "La description doit être une chaîne de caractères",
    "string.min": "La description doit contenir au moins 10 caractères",
    "string.max": "La description doit contenir au plus 1000 caractères",
  }),
  status: Joi.string()
    .valid("pending", "approved", "rejected")
    .optional()
    .messages({
      "any.only": "Le statut doit être 'pending', 'approved' ou 'rejected'",
    }),
}).unknown(true); // ignore "poster" et autres champs non validés
