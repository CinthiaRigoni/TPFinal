const {body, validationResult} = require('express-validator');

  exports.validator = [
    body('denominacion').custom((value) => {
      return value.match(/^[A-Za-z 0-9]+$/);
    })
    .withMessage("Denominacion debe contener solo letras y numeros")
    .bail()
    .notEmpty()
    .withMessage("Campo vacio")
    .bail(),
    
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next()
    }
  ]