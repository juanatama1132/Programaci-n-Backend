import CartModel from "../models/cart.model.js";
class CartMannager {
  constructor() {}
  addCart = async (params) => {
    console.log(params);
    const { userId, cartId, products, cartTotal } = params;

    return await CartModel.create({
      cartId: 1,
      userId: 1,
      products: [],
      cartTotal: 0,
    });
  };
  modCart = async (params) => {
    const { cId, pId, cartTotal } = params;
    if (!pId) {
      await CartModel.updateOne(
        { cartId: cId },
        {
          "products.$[item].code": pId,
          $inc: { "products.$[item].code": 1 },
          cartTotal,
        },
        { upsert: true, arrayFilters: [(item.code = pId)] }
      );
    } else {
      await CartModel.updateOne(
        { cartId: cId },
        {
          "products.$[item].code": pId,
          $inc: { "products.$[item].code": 1 },
          cartTotal,
        },
        { upsert: true, arrayFilters: [(item.code = pId)] }
      );
    }
    return await CartModel.find({ _id: cId }).lean();
  };
  delCart = async (params) => {
    const { cId } = params;
    await CartModel.deleteOne({ _id: cId });
    return await CartModel.find({ _id: cId }).lean();
  };
  getCarts = async (params) => {
    return await CartModel.find({}).lean();
  };
  getCartbyId = async (params) => {
    const { cId } = params;
    return await CartModel.find({ _id: cId }).lean();
  };
}
const CartManager = new CartMannager();
export default CartManager;