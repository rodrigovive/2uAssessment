const express = require("express");

const router = express.Router();
const {
  addInvoice,
  getInvoices,
  updateInvoice,
  socketEmitInvoiceCreated,
  socketEmitInvoiceUpdated,
} = require("../controllers/invoice");

// TODO endpoint invoice filter by pending

router.route("/invoice").get(getInvoices);
router.route("/invoice").post(addInvoice, socketEmitInvoiceCreated);

router.route("/invoice/:id").patch(updateInvoice, socketEmitInvoiceUpdated);

module.exports = router;
