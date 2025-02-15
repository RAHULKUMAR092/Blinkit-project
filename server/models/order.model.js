import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    orderId: {
      type: String,
      required: [true, "Provide order id"],
      unique: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    product_details: {
      name: String,
      image: Array,
    },
    paymentId: {
      type: String,
      default: "",
    },
    payment_status: {
      type: String,
      default: "",
    },
    delivery_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
    },
    subTotalAmt: {
      type: Number,
      default: 0.0,
    },
    totalAmt: {
      type: Number,
      default: 0.0,
    },
    invoice_receipt: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("order", orderSchema);

export default OrderModel;
