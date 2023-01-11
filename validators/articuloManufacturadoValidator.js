const { body, validationResult } = require('express-validator');

exports.validator = [
  body('tiempoCocinaEstimado')
    .isNumeric()
    .withMessage('Tiempo de cocina debe ser Numerico (tiempo en minutos)')
    .bail()
    .notEmpty()
    .withMessage('Tiempo de cocina estimado vacio')
    .bail(),

  body('denominacion')
    .custom((value) => {
      return value.match(/^[A-Za-z 0-9]+$/);
    })
    .withMessage("Denominacion debe contener solo letras y numeros")
    .bail()
    .notEmpty()
    .withMessage("Campo vacio")
    .bail(),

  body('precioVenta')
    .isDecimal()
    .withMessage('Precio de Venta debe ser Decimal')
    .bail()
    .notEmpty()
    .withMessage('Precio de Venta vacio')
    .bail(),

  body('imagen')
    .isAlphanumeric()
    .withMessage('Nombre de imagen debe contener solo letras y/o numeros')
    .bail()
    .notEmpty()
    .withMessage('Campo vacio')
    .bail(),

  body('rubroGeneral_id')
    .isNumeric()
    .withMessage('rubroGeneral_id debe ser numero')
    .bail()
    .notEmpty()
    .withMessage('Campo Vacio')
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
  }
]