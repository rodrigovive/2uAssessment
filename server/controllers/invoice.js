const { v4: uuidv4 } = require("uuid");
const Invoice = require("../models/invoice");

// TODO validate data
// TODO sanizitation
//
const getInvoices = () => {};

const addInvoice = async (req, res) => {
  try {
    const {
      body: {
        invoice_number,
        total,
        currency,
        invoice_date,
        due_date,
        vendor_name,
        remittance_address,
      },
    } = req;

    const newInvoice = await Invoice({
      invoice_date,
      total,
      currency,
      invoice_date,
      due_date,
      vendor_name,
      remittance_address,
    });
    const invoice = await newInvoice.save();
    // TODO should be 201 not 200
    res.status(200).json({
      data: invoice,
      success: true,
    });
  } catch (e) {
    console.log("e", e.message);
    return res.status(500).json({
      error: e.message,
      success: false,
    });
  }
};

module.exports = {
  addInvoice,
};
