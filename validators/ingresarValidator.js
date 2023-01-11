const {body, validationResult} = require('express-validator');

  exports.validator = [
    body('usuario')
      .isAlphanumeric()
      .withMessage('usuario debe contener solo letras o numeros, sin espacios')
      .bail()
      .notEmpty()
      .withMessage('campo usuario vacio')
      .bail(),

    body('clave')
      .notEmpty()
      .withMessage('campo clave vacio')
      .bail(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next()
    }
  ]