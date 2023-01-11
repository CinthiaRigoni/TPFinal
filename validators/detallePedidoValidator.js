const {body, validationResult} = require('express-validator');

  exports.validator = [
    body('cantidad')
      .isNumeric()
      .withMessage('cantidad debe ser numerico')
      .bail()
      .notEmpty()
      .withMessage('cantidad Vacio')
      .bail(),

      body('subtotal')
      .isDecimal()
      .withMessage('Subtotal debe ser Decimal')
      .bail()
      .notEmpty()
      .withMessage('Subtotal vacio')
      .bail(),

      body('articuloManufacturado_id')
      .isNumeric()
      .withMessage('articuloManufacturado_id debe ser numero')
      .bail()
      .notEmpty()
      .withMessage('Campo Vacio')
      .bail(),

      body('bebida_id')
      .isNumeric()
      .withMessage('bebida_id debe ser numero')
      .bail()
      .notEmpty()
      .withMessage('Campo Vacio')
      .bail(),

      body('pedido_id')
      .isNumeric()
      .withMessage('pedido_id debe ser numero')
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