import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    billNumber: {
      type: Number,
      unique: true,
    },
    billDate: {
      type: Date,
      default: new Date().toISOString().split("T")[0],
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    items: {
      type: [
        {
          code: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },

          rate: {
            type: Number,
            required: true,
          },
          unit: {
            type: Number,
            required: true,
          },
          bags: {
            type: Number,
            required: true,
          },
          units: {
            type: Number,
            default: 0,
          },
          amount: {
            type: Number,
            default: 0,
          },
        },
      ],
      required: true,
    },

    totalAmount: {
      type: Number,
      deafult: 0,
    },
    paid: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

billSchema.pre("save", async function (next) {
  let totAmount = 0;
  if (!this.billNumber) {
    const lastBill = await Bill.findOne().sort({ billNumber: -1 });
    this.billNumber = lastBill ? lastBill.billNumber + 1 : 1;
  }
  this.items.forEach((item) => {
    (item.units = item.unit * item.bags),
      (item.amount = item.units * item.rate);
    totAmount += item.amount;
  });
  this.totalAmount = totAmount;
  next();
});

const Bill = mongoose.model("Bill", billSchema);

export default Bill;
