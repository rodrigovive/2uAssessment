const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
 *{
  "invoice_number": "12345",
  "total": "199.99",
  "currency": "USD",
  "invoice_date": "2019-08-17",
  "due_date": "2019-09-17",
  "vendor_name": "Acme Cleaners Inc.",
  "remittance_address": "123 ABC St. Charlotte, NC 28209"
}
 *
 */
// TODO validation hooks mongoose
// TODO improve schema
const invoiceSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    invoice_number: {
      type: String,
    },
    currency: {
      type: String,
    },
    invoice_date: {
      type: String,
    },
    due_date: {
      type: String,
    },
    vendor_name: {
      type: String,
    },
    remittance_address: {
      type: String,
    },
    total: {
      type: String,
    },
    status: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
