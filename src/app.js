// empezamos importando
const ProductManager = require("./product-Manager");
const express = require("express");
const manager = new ProductManager("./src/productos.json");

// creamos puerto
const PUERTO = 8080;

// creamos app

const app = express();

// creamos ruta

app.get("/products", async (req, res) => {
  try {
    const arrayProductos = await manager.leerArchivo();

    let limit = parseInt(req.query.limit);

    if (limit) {
      const arrayConLimite = arrayProductos.slice(0, limit);
      return res.send(arrayConLimite);
    } else {
      return res.send(arrayProductos);
    }
  } catch (error) {
    console.log("error error error", error);
    return res.send.apply("error al cargar el archivo");
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    let pid = parseInt(req.params.pid);

    const buscar = await manager.getProductById(pid);

    if (buscar) {
      return res.send(buscar);
    } else {
      return res.send("ID de producto incorreecto, intente de nuevo");
    }
  } catch (error) {
    console.log(error);
    res.send("error al cargar");
  }
});

// ponemos a escuchar al segvidor
app.listen(PUERTO, () => {
  console.log(`Escuchado http://localhost:${PUERTO}`);
});
