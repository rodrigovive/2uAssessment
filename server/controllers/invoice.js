const { v4: uuidv4 } = require("uuid");
const Invoice = require("../models/invoice");

const getInvoices = async (req, res) => {
  try {
    // TODO validate data
    // TODO sanizitation
    //
    const invoices = await Invoice.find();
    return res.status(200).json({
      data: invoices,
      success: true,
    });
  } catch (e) {
    console.log("e", e);
    return res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};

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
      id: uuidv4(),
      invoice_number,
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
  getInvoices,
};
