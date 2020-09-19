const express = require("express");

const router = express.Router();
const { addInvoice } = require("../controllers/invoice");
router.route("/invoice").post(addInvoice);

module.exports = router;
