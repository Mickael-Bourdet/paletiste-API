import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";

// Extend Joi with the joi-password plugin to add password validation rules
const joiPassword = Joi.extend(joiPasswordExtendCore);

export const registerSchema = Joi.object({
  pseudo: Joi.string().trim().min(3).max(50).required().messages({
    "string.base": "Le pseudo doit être une chaîne de caractères",
    "string.min": "Le pseudo doit contenir au moins 3 caractères",
    "string.max": "Le pseudo doit contenir au plus 50 caractères",
    "string.empty": "Le pseudo ne peut pas être vide",
    "any.required": "Le pseudo est requis",
  }),
  email: Joi.string().trim().email().required().messages({
    "string.base": "L'email doit être une chaîne de caractères",
    "string.email": "L'email doit être valide",
    "string.empty": "L'email ne peut pas être vide",
    "any.required": "L'email est requis",
  }),
  password: joiPassword
    .string()
    .min(12)
    .max(100)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .minOfSpecialCharacters(1)
    .noWhiteSpaces()
    .required()
    .messages({
      "string.min": "Le mot de passe doit contenir au moins 12 caractères.",
      "string.max": "Le mot de passe ne doit pas dépasser 100 caractères.",
      "string.base": "Le mot de passe doit être une chaîne de caractères.",
      "string.empty": "Le mot de passe ne peut pas être vide.",
      "any.required": "Le mot de passe est requis.",
      "password.minOfLowercase":
        "Le mot de passe doit contenir au moins une lettre minuscule.",
      "password.minOfUppercase":
        "Le mot de passe doit contenir au moins une lettre majuscule.",
      "password.minOfNumeric":
        "Le mot de passe doit contenir au moins un chiffre.",
      "password.minOfSpecialCharacters":
        "Le mot de passe doit contenir au moins un caractère spécial.",
      "password.noWhiteSpaces":
        "Le mot de passe ne doit pas contenir d'espaces.",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Les mots de passe ne correspondent pas",
    "any.required": "La confirmation du mot de passe est requise",
  }),
});
