const {body, validationResult} = require('express-validator');

  exports.validator = [
    body('nombreRol').custom((value) => {
      return value.match(/^[A-Za-z 0-9]+$/);
    })
    .withMessage("Nombre rol debe contener solo letras y numeros")
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