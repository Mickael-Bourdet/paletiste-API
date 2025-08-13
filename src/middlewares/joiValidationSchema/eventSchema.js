import Joi from "joi";

export const createEventSchema = Joi.object({
  title: Joi.string().trim().max(100).optional().messages({
    "string.base": "Le titre doit être une chaîne de caractères",
    "string.max": "Le titre doit contenir au plus 100 caractères",
  }),
  organizer: Joi.string().trim().min(3).max(50).required().messages({
    "string.base":
      "Le nom de l'organisateur doit être une chaîne de caractères",
    "string.empty": "Le nom de l'organisateur est obligatoire",
    "string.min":
      "Le nom de l'organisateur doit contenir au moins 3 caractères",
    "string.max":
      "Le nom de l'organisateur doit contenir au plus 50 caractères",
  }),
  location: Joi.string().trim().min(3).required().messages({
    "string.base": "Le lieu doit être une chaîne de caractères",
    "string.empty": "Le lieu est obligatoire",
    "string.min": "Le lieu doit contenir au moins 3 caractères",
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
  description: Joi.string().trim().min(10).max(1000).optional().messages({
    "string.base": "La description doit être une chaîne de caractères",
    "string.min": "La description doit contenir au moins 10 caractères",
    "string.max": "La description doit contenir au plus 1000 caractères",
  }),
  registration_time: Joi.string().trim().min(3).max(5).optional().messages({
    "string.base": "L'heure d'inscription doit être une chaîne de caractères",
    "string.min": "L'heure d'inscription doit contenir au moins 3 caractères",
    "string.max": "L'heure d'inscription doit contenir au plus 5 caractères",
  }),
  start_time: Joi.string().trim().min(3).max(5).required().messages({
    "string.base": "L'heure de début doit être une chaîne de caractères",
    "string.empty": "L'heure de début est obligatoire",
    "string.min": "L'heure de début doit contenir au moins 3 caractères",
    "string.max": "L'heure de début doit contenir au plus 5 caractères",
  }),
  reservation: Joi.string().trim().min(10).required().messages({
    "string.base":
      "Les informations de réservation doivent être une chaîne de caractères",
    "string.empty": "Les informations de réservation sont obligatoires",
    "string.min":
      "Les informations de réservation doivent contenir au moins 10 caractères",
    "any.required": "Les informations de réservation sont obligatoires",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Le prix doit être un nombre",
    "number.empty": "Le prix est obligatoire",
    "number.min": "Le prix doit être supérieur à 0",
  }),
  credit_card: Joi.boolean().optional().messages({
    "boolean.base": "Le paiement par carte de crédit doit être un booléen",
  }),
});

export const updateEventSchema = Joi.object({
  title: Joi.string().trim().max(100).optional().messages({
    "string.base": "Le titre doit être une chaîne de caractères",
    "string.max": "Le titre doit contenir au plus 100 caractères",
  }),
  organizer: Joi.string().trim().min(3).max(50).optional().messages({
    "string.base":
      "Le nom de l'organisateur doit être une chaîne de caractères",
    "string.min":
      "Le nom de l'organisateur doit contenir au moins 3 caractères",
    "string.max":
      "Le nom de l'organisateur doit contenir au plus 50 caractères",
  }),
  location: Joi.string().trim().min(3).optional().messages({
    "string.base": "Le lieu doit être une chaîne de caractères",
    "string.min": "Le lieu doit contenir au moins 3 caractères",
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
  description: Joi.string().trim().min(10).max(1000).optional().messages({
    "string.base": "La description doit être une chaîne de caractères",
    "string.min": "La description doit contenir au moins 10 caractères",
    "string.max": "La description doit contenir au plus 1000 caractères",
  }),
  registration_time: Joi.string().trim().min(3).max(5).optional().messages({
    "string.base": "L'heure d'inscription doit être une chaîne de caractères",
    "string.min": "L'heure d'inscription doit contenir au moins 3 caractères",
    "string.max": "L'heure d'inscription doit contenir au plus 5 caractères",
  }),
  start_time: Joi.string().trim().min(3).max(5).optional().messages({
    "string.base": "L'heure de début doit être une chaîne de caractères",
    "string.min": "L'heure de début doit contenir au moins 3 caractères",
    "string.max": "L'heure de début doit contenir au plus 5 caractères",
  }),
  reservation: Joi.string().trim().min(10).optional().messages({
    "string.base":
      "Les informations de réservation doivent être une chaîne de caractères",
    "string.min":
      "Les informations de réservation doivent contenir au moins 10 caractères",
  }),
  price: Joi.number().min(0).optional().messages({
    "number.base": "Le prix doit être un nombre",
    "number.min": "Le prix doit être supérieur à 0",
  }),
  credit_card: Joi.boolean().optional().messages({
    "boolean.base": "Le paiement par carte de crédit doit être un booléen",
  }),
  status: Joi.valid("pending", "approved", "rejected").optional().messages({
    "any.only": "Le statut doit être 'pending', 'approved' ou 'rejected'",
  }),
});
