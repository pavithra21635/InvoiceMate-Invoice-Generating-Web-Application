const Invoice = require("../models/Invoice");

exports.createInvoice = async (req, res) => {
  try {
    const { items, taxPercentage, discountPercentage } = req.body;

    const subtotal = items.reduce((acc, item) => {
      return acc + (item.quantity * item.unitPrice);
    }, 0);


    const taxAmount = subtotal * (taxPercentage / 100 || 0);
    const discountAmount = subtotal * (discountPercentage / 100 || 0);


    const totalAmount = subtotal + taxAmount - discountAmount;

    
    const newInvoice = new Invoice({
      ...req.body,
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

exports.getInvoices = async (req, res) => {
  try {
   
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};