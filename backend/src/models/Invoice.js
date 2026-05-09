const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  // Invoice Metadata
  invoiceNumber: { type: String, required: true, unique: true },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },

  biller: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
  },

  client: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
  },

  items: [
    {
      description: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      unitPrice: { type: Number, required: true, min: 0 },
    },
  ],

  taxPercentage: { type: Number, default: 0 },
  discountPercentage: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
discountAmount: { type: Number, default: 0 },
  subtotal: { type: Number, required: true },
  totalAmount: { type: Number, required: true },

  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Invoice", InvoiceSchema);