import { Schema, model } from "mongoose";
const collection = "carts";
const CartSchema = new Schema({
  // userId2:{type: Schema.Types.ObjectId, ref: "users" },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  cartId: {
    type: Number,
    required: true,
    index: true,
  },
  // eMail: { type: String, required: true },
  products: {
    type: [
      {
        code: { type: Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, default: 0 },
      },
    ],
  },
  cartTotal: { type: Number, default: 0 },
  purchased: {
    type: Boolean,
    default: false,
  },
});
CartSchema.pre("find", function () {
  this.populate("products.code");
  // this.populate("products.code").populate("users.userId");
});
const CartModel = model(collection, CartSchema);

export default CartModel;