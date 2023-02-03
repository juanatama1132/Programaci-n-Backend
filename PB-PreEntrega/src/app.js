import express, { urlencoded } from "express";
import productsRouter from "./routes/products.router";
import cartsRouter from "./routes/carts.router";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "public"));
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Servidor activo y escuchando por puerto: ${PORT}`);
});