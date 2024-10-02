const { body, validationResult } = require("express-validator");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Reusable validation functions
const validateEmail = () => {
  return body("email").custom((value) => {
    if (!value) {
      throw new Error("Email is required");
    }
    if (!value.match(emailRegex)) {
      throw new Error("Enter a valid email address(e.g. sample@gmail.com).");
    }
    return true;
  });
};

const validatePassword = () => {
  return body("password").custom((value) => {
    if (!value) {
      throw new Error("Password is required");
    }
    if (value.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    return true;
  });
};

const validateForgotPassword = () => {
  return [
    body("password").custom((value) => {
      if (!value) {
        throw new Error("Password is required");
      }
      if (value.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      return true;
    }),
    body("confirmPassword").custom((value, { req }) => {
      if (!value) {
        throw new Error("Confirm password is required");
      }
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ];
};

const validateRequiredField = (fieldName) => {
  const fieldNameWithSpaces = fieldName
    .replace(/([A-Z])/g, " $1") // Add a space before each uppercase letter
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter

  return body(fieldName)
    .trim()
    .notEmpty()
    .withMessage(`${fieldNameWithSpaces} is required`);
};

// Validation rules for login
const loginValidationRules = () => {
  return [validateEmail(), validateRequiredField("password")];
};

// Validation rules for register
const registerValidationRules = () => {
  return [
    validateRequiredField("firstName"),
    validateRequiredField("lastName"),
    validateRequiredField("middleInitial"),
    validateEmail(),
    validateRequiredField("birthDate"),
    validateRequiredField("contactNumber"),
    validateRequiredField("designation"),
    validatePassword(),
    body("confirmPassword").custom((value, { req }) => {
      if (!value) {
        throw new Error("Confirm password is required");
      }

      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ];
};

const uploadDocumentValidation = () => {
  return [
    body("tracking_number")
      .trim()
      .custom((value) => {
        if (!value) {
          throw new Error("Tracking number is required");
        }
        return true;
      }),
    body("document_name")
      .trim()
      .custom((value) => {
        if (!value) {
          throw new Error("Document name is required");
        }
        return true;
      }),
    body("document_type")
      .trim()
      .custom((value) => {
        if (!value) {
          throw new Error("Document type is required");
        }
        return true;
      }),
    body("uploaded_by")
      .trim()
      .custom((value) => {
        if (!value) {
          throw new Error("Uploaded by is required");
        }
        return true;
      }),
    body("route").custom((value) => {
      if (!value) {
        throw new Error("Route is required");
      }
      return true;
    }),
  ];
};

const updateProfileValidation = () => {
  return [
    validateRequiredField("firstName"),
    validateRequiredField("lastName"),
    validateRequiredField("middleInitial"),
    validateEmail(),
    validateRequiredField("birthDate"),
    validateRequiredField("contactNumber"),
    validateRequiredField("designation"),
  ];
};

// Middleware to validate form
const validateForm = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

module.exports = {
  loginValidationRules,
  registerValidationRules,
  validateForm,
  validateEmail,
  validateForgotPassword,
  updateProfileValidation,
  uploadDocumentValidation,
};
