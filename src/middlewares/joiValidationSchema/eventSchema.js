import Joi from "joi";

export const createEventSchema = Joi.object({
  title: Joi.string().trim().min(10).max(100).message({
    "string.base": "Le titre doit être une chaîne de caractères",
    "string.min": "Le titre doit contenir au moins 10 caractères",
    "string.max": "Le titre doit contenir au plus 100 caractères",
  }),
  organizer: Joi.string().trim().min(3).max(50).required().message({
    "string.base":
      "Le nom de l'organisateur doit être une chaîne de caractères",
    "string.empty": "Le nom de l'organisateur est obligatoire",
    "string.min":
      "Le nom de l'organisateur doit contenir au moins 3 caractères",
    "string.max":
      "Le nom de l'organisateur doit contenir au plus 50 caractères",
  }),
  poster: Joi.string().trim().min(10).required().message({
    "string.base": "L'URL du poster doit être une chaîne de caractères",
    "string.min": "L'URL du poster doit contenir au moins 10 caractères",
    "string.empty": "L'URL du poster est obligatoire",
    "any.required": "L'URL du poster est obligatoire",
  }),
  location: Joi.string().trim().min(3).required().message({
    "string.base": "Le lieu doit être une chaîne de caractères",
    "string.empty": "Le lieu est obligatoire",
    "string.min": "Le lieu doit contenir au moins 3 caractères",
  }),
  date: Joi.date()
    .min(new Date())
    .required()
    .max(new Date(new Date().getFullYear() + 1, 11, 31))
    .message({
      "date.base": "La date doit être une date valide",
      "date.empty": "La date est obligatoire",
      "date.min": "La date doit être supérieure à la date actuelle",
      "date.max":
        "La date doit être inférieure à la date du 31 décembre de l'année prochaine",
    }),
  description: Joi.string().trim().min(10).max(1000).message({
    "string.base": "La description doit être une chaîne de caractères",
    "string.empty": "La description est obligatoire",
    "string.min": "La description doit contenir au moins 10 caractères",
    "string.max": "La description doit contenir au plus 1000 caractères",
  }),
  registration_time: Joi.string().trim().min(3).max(5).message({
    "string.base": "L'heure d'inscription doit être une chaîne de caractères",
    "string.min": "L'heure d'inscription doit contenir au moins 3 caractères",
    "string.max": "L'heure d'inscription doit contenir au plus 5 caractères",
  }),
  start_time: Joi.string().trim().min(3).max(5).required().message({
    "string.base": "L'heure de début doit être une chaîne de caractères",
    "string.empty": "L'heure de début est obligatoire",
    "string.min": "L'heure de début doit contenir au moins 3 caractères",
    "string.max": "L'heure de début doit contenir au plus 5 caractères",
  }),
  reservation: Joi.string().trim().min(10).required().message({
    "string.base":
      "Les informations de réservation doivent être une chaîne de caractères",
    "string.empty": "Les informations de réservation sont obligatoires",
    "string.min":
      "Les informations de réservation doivent contenir au moins 10 caractères",
    "any.required": "Les informations de réservation sont obligatoires",
  }),
  price: Joi.number().min(0).required().message({
    "number.base": "Le prix doit être un nombre",
    "number.empty": "Le prix est obligatoire",
    "number.min": "Le prix doit être supérieur à 0",
  }),
  credit_card: Joi.boolean().optional().message({
    "boolean.base": "Le paiement par carte de crédit doit être un booléen",
  }),
  status: Joi.valid("pending", "approved", "rejected").required().messages({
    "any.only": "Le statut doit être 'pending', 'approved' ou 'rejected'",
  }),
});
