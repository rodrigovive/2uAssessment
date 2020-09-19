const express = require("express");

const router = express.Router();
const { addInvoice, getInvoices } = require("../controllers/invoice");

router.route("/invoice").get(getInvoices);
router.route("/invoice").post(addInvoice);

module.exports = router;
