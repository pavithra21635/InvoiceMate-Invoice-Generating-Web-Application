const express = require("express");
const router = express.Router();
const { createInvoice, getInvoices, getNextInvoiceNumber } = require("../controllers/invoiceController");

router.post("/", createInvoice);
router.get("/", getInvoices);
router.get("/next-number", getNextInvoiceNumber);

module.exports = router;