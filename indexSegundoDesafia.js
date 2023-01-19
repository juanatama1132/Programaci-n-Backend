const fs = require("fs");
class ProductMannager {
  #path = "./data";
  #data;
  constructor() {
    this.products = [];
  }

  addProduct = (producto, precio, productId, stock) => {
    const product = {
      id: 0,
      title: producto,
      price: precio,
      code: productId,
      stock: stock,
    };

    if (this.products.findIndex((product) => product.code === productId)) {
      if (this.products.length === 0) {
        product.id = 1;
      } else {
        product.id = this.products[this.products.length - 1].id + 1;
      }
      this.products.push(product);
      this.#data = JSON.stringify(this.products);
      fs.promises
        .writeFile(`${this.#path}/stock.dat`, this.#data, "utf-8")
        .then(() => console.log("Fichero actualizado}"))
        .catch((err) => console.log(err));
      return;
    }
    return console.log(`Duplicated Code "${productId}"`);
  };
  getProducts = () => {
    return this.products;
  };
  getProductById = (id) => {
    const res = this.products.filter((product) => product.id === id);
  
    if (res.length === 0) {
      return '"Product not Found"';
    }
    return res;
  };
}
const PM = new ProductMannager();

addProducts();
console.log("Listado de Productos");
console.log(PM.getProducts());
console.log("");
console.log("");
console.log(`Producto id=1`);
console.log(PM.getProductById(1));
console.log(`Producto id=5`);
console.log(PM.getProductById(5));
console.log(`Producto id=2`);
console.log(PM.getProductById(2));
console.log(`Producto id=4`);
console.log(PM.getProductById(4));
console.log(`Producto id=3`);
console.log(PM.getProductById(3));
console.log(`Producto id=6`);
console.log(PM.getProductById(6));

function addProducts() {

  PM.addProduct("Barra de Oro", 53200, `18k`, 3);
  PM.addProduct(
    "Barra de Oro",
    333500,
    "b-21k",
    5
  );
  PM.addProduct(
    "Barra de Plata",
    25350,
    "b-295",
    10
  );

  PM.addProduct("Mezquita", 77100, `b-mezq`, 90);

  PM.addProduct(
    "Austenita",
    6650,
    "b-aust",
    25
  );
  PM.addProduct("Perlita", 88600, "b-Per", 5);
}