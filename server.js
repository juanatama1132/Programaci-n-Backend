import fs from "fs";
import express, { urlencoded } from "express";
const app = express();
app.use(urlencoded({ extended: true }));
const PORT = 8080;
const Products = [];
const path = "./data";

const LoadData = async () => {
  try {
    let data = await fs.promises.readFile(`${path}/stock.dat`, "utf8");
    let parsedData = [];
    parsedData = JSON.parse(data);
    parsedData.forEach((product) => {
      Products.push(product);
    });
  } catch (err) {
    console.log(err);
  }
};

LoadData();

app.get("/products", (req, res) => {
  const { limit } = req.query;
  if (!limit || !Number.isInteger(parseInt(limit))) res.send(Products);
  const prodList = Products.filter((product) => product.id <= limit);
  res.send(prodList);
});

app.get("/products/:pId", (req, res) => {
  const { pId } = req.params;
  const product = Products.find((item) => item.id === parseInt(pId));
  if (!product) res.send("Producto invalido o inexistente");
  res.send(product);
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Servidor activo y escuchando por puerto: ${PORT}`);
});