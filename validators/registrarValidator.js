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

    body('nombre').custom((value) => {
      return value.match(/^[A-Za-z 0-9]+$/);
    })
      .withMessage('Nombre debe contener solo letras y numeros')
      .bail()
      .notEmpty()
      .withMessage('Campo Nombre vacio')
      .bail(),

    body('apellido').custom((value) => {
        return value.match(/^[A-Za-z 0-9]+$/);
      })
        .withMessage('Apellido debe contener solo letras y numeros')
        .bail()
        .notEmpty()
        .withMessage('Campo Apellido vacio')
        .bail(),

      body('telefono')
        .isNumeric()
        .withMessage('Telefono debe contener solo numeros sin espacios')
        .bail()
        .notEmpty()
        .withMessage('Campo Telefono Vacio')
        .bail(),

      body('email')
        .isEmail()
        .withMessage('Debe ser formato de email valido')
        .bail()
        .notEmpty()
        .withMessage('Campo email Vacio')
        .bail(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next()
    }
  ]