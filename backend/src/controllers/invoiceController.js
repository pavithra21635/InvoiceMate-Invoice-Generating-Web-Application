const Invoice = require("../models/Invoice");
const Counter = require("../models/Counter");

exports.createInvoice = async (req, res) => {
  try {

    const counter = await Counter.findOneAndUpdate(
      { id: "invoiceId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const sequenceNumber = counter.seq.toString().padStart(3, '0');
    const autoInvoiceNumber = `INV-${sequenceNumber}`;

    const { items, taxPercentage, discountPercentage } = req.body;

    const subtotal = items.reduce((acc, item) => {
      return acc + (item.quantity * item.unitPrice);
    }, 0);


    const taxAmount = subtotal * (taxPercentage / 100 || 0);
    const discountAmount = subtotal * (discountPercentage / 100 || 0);


    const totalAmount = subtotal + taxAmount - discountAmount;

    
    const newInvoice = new Invoice({
      ...req.body,
      invoiceNumber: autoInvoiceNumber,
      subtotal,      
      taxAmount,      
      discountAmount, 
      totalAmount     
    });

    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (err) {
   
    res.status(400).json({ message: err.message });
  }
};

exports.getAllInvoices = async (req, res) => {
  try {
   
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNextInvoiceNumber = async (req, res) => {
  try {
    const counter = await Counter.findOne({ id: "invoiceId" });
    const nextSeq = counter ? counter.seq + 1 : 1;
    const formattedNumber = `INV-${nextSeq.toString().padStart(3, '0')}`;
    res.status(200).json({ nextNumber: formattedNumber });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedInvoice = await Invoice.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};