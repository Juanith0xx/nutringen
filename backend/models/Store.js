// backend/models/Store.js
import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    region: {
      type: String,
      required: true,
      trim: true,
    },
    comuna: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: [Number], // [lat, lng]
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length === 2;
        },
        message: "Position debe contener [lat, lng]",
      },
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);

export default Store;
