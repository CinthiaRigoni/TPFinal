const { body, validationResult } = require('express-validator');

exports.validator = [
  body('nombreBebida').custom((value) => {
    return value.match(/^[A-Za-z 0-9]+$/);
  })
    .withMessage("Nombre Bebida debe contener solo letras y numeros")
    .bail()
    .notEmpty()
    .withMessage("Campo vacio")
    .bail(),

  body('precioCompra').isNumeric()
    .withMessage('Precio de Compra debe ser Decimal')
    .bail()
    .notEmpty()
    .withMessage('Precio de Compra vacio')
    .bail(),

  body('precioVenta')
    .isDecimal()
    .withMessage('Precio de Venta debe ser Decimal')
    .bail()
    .notEmpty()
    .withMessage('Precio de Venta vacio')
    .bail(),

  body('stockActual')
    .isNumeric()
    .withMessage('Stock debe ser numero')
    .bail()
    .notEmpty()
    .withMessage('Stock actual Vacio')
    .bail(),

  body('imagen').custom((value) => {
    return value.match(/^[A-Za-z 0-9]+$/);
  })
    .withMessage("Imagen debe contener solo letras y numeros")
    .bail()
    .notEmpty()
    .withMessage("Campo vacio")
    .bail(),

  body('unidadMedida').custom((value) => {
    return value.match(/^[A-Za-z 0-9]+$/);
  })
    .withMessage('Unidad Medida debe contener solo letras y numeros')
    .bail()
    .notEmpty()
    .withMessage('Nombre de bebida vacio')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
  }
]