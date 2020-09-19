const { v4: uuidv4 } = require("uuid");
const Invoice = require("../models/invoice");

const updateInvoice = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const invoice = await Invoice.findOne({ id });
    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: "todo not found",
      });
    }
    const updates = Object.keys(body);
    updates.forEach((update) => (invoice[update] = body[update]));
    await invoice.save();
    res.locals.invoice = invoice;
    res.status(200).json({
      success: true,
      data: invoice,
    });
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};

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

const addInvoice = async (req, res, next) => {
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
      status: "pending",
    });
    const invoice = await newInvoice.save();

    res.locals.invoice = invoice;
    // TODO should be 201 not 200
    res.status(200).json({
      //data: invoice,
      //success: true,
      message: "invoice submitted successfully",
    });
    next();
  } catch (e) {
    console.log("e", e.message);
    return res.status(500).json({
      error: e.message,
      success: false,
    });
  }
};

const socketEmitInvoiceUpdated = (req, res) => {
  req.io.emit("invoiceUpdated", res.locals.invoice);
};

const socketEmitInvoiceCreated = (req, res) => {
  req.io.emit("invoiceCreated", res.locals.invoice);
};

module.exports = {
  addInvoice,
  getInvoices,
  socketEmitInvoiceCreated,
  socketEmitInvoiceUpdated,
  updateInvoice,
};
