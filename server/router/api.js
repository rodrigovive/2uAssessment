const express = require("express");

const router = express.Router();
const {
  addInvoice,
  getInvoices,
  socketEmitInvoiceCreated,
} = require("../controllers/invoice");

router.route("/invoice").get(getInvoices);
router.route("/invoice").post(addInvoice, socketEmitInvoiceCreated);

module.exports = router;
