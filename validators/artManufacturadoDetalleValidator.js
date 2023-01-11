const {body, validationResult} = require('express-validator');

  exports.validator = [
    body('cantidad')
      .isNumeric()
      .withMessage('Cantidad debe ser Numerico')
      .bail()
      .notEmpty()
      .withMessage('Campo vacio')
      .bail(),

    body('unidadMedida')
      .custom((value) => {
        return value.match(/^[A-Za-z 0-9]+$/);
      })
      .withMessage("Unidad Medida debe contener solo letras y numeros")
      .bail()
      .notEmpty()
      .withMessage("Campo vacio")
      .bail(),

    body('articuloInsumo_id')
      .isNumeric()
      .withMessage('articuloInsumo_id debe ser Numerico')
      .bail()
      .notEmpty()
      .withMessage('Campo vacio')
      .bail(),

    body('articuloManufacturado_id')
      .isNumeric()
      .withMessage('articuloManufacturado_id debe ser Numerico')
      .bail()
      .notEmpty()
      .withMessage('Campo vacio')
      .bail(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next()
    }
  ]