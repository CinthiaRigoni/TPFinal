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

    body('stockMinimo')
      .isNumeric()
      .withMessage('Stock debe ser numero')
      .bail()
      .notEmpty()
      .withMessage('Stock actual Vacio')
      .bail(),

    body('unidadMedida').custom((value) => {
        return value.match(/^[A-Za-z 0-9]+$/);
      })
      .withMessage('Unidad Medida debe contener solo letras y numeros')
      .bail()
      .notEmpty()
      .withMessage('Nombre de bebida vacio')
      .bail(),
    
    body('esInsumo')
      .isBoolean()
      .withMessage('esInsumo debe ser booleano (0 y 1)')
      .bail()
      .notEmpty()
      .withMessage('esInsumo Vacio')
      .bail(),

    body('rubroInsumo_id')
      .isNumeric()
      .withMessage('rubroInsumo_id debe ser numerico')
      .bail()
      .notEmpty()
      .withMessage('rubroInsumo_id Vacio')
      .bail(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next()
    }
  ]