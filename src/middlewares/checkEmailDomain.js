import { isDisposableEmail, isDomainValid } from "../utils/emailServices.js";
import { ApiError } from "../middlewares/ApiError.js";

export const checkEmailDomain = async (req, res, next) => {
  const { email } = req.body;

  // Check if the email is a disposable email
  if (isDisposableEmail(email)) {
    return next(
      new ApiError("Les adresses e-mail temporaires ne sont pas acceptées", 400)
    );
  }

  // Validate the email domain
  const domainIsValid = await isDomainValid(email);
  if (!domainIsValid) {
    return next(new ApiError("Ce domaine n'est pas valide.", 400));
  }
  return next();
};
