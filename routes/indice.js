//Archivo que se encarga de importar todas las rutas de la carpeta 
//"routes" y los guarda en la variable index. Express lo importa en app.js

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const index = []

fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(fileRuta => {
  let ruta = require(path.join(__dirname, fileRuta))
  index.push(ruta)
});

module.exports = index;