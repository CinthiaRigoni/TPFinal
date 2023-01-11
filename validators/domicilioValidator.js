const {body, validationResult} = require('express-validator');

  exports.validator = [
    body('usuario_id')
      .isNumeric()
      .withMessage('usuario_id debe ser numerico')
      .bail()
      .notEmpty()
      .withMessage('usuario_id Vacio')
      .bail(),

    body('calle').custom((value) => {
      return value.match(/^[A-Za-z 0-9]+$/);
    })
      .withMessage('Calle debe contener solo letras y numeros')
      .bail()
      .notEmpty()
      .withMessage('Campo Calle vacio')
      .bail(),

    body('numero')
      .isNumeric()
      .withMessage('Numero debe ser numero')
      .bail()
      .notEmpty()
      .withMessage('Campo Numero Vacio')
      .bail(),

    body('localidad').custom((value) => {
        return value.match(/^[A-Za-z 0-9]+$/);
      })
        .withMessage('Localidad debe contener solo letras y numeros')
        .bail()
        .notEmpty()
        .withMessage('Campo Localidad vacio')
        .bail(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next()
    }
  ]