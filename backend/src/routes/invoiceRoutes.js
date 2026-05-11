const express = require("express");
const router = express.Router();
const { createInvoice, getAllInvoices, getNextInvoiceNumber , deleteInvoice} = require("../controllers/invoiceController");

router.post("/", createInvoice);
// router.get("/", getInvoices);
router.get("/next-number", getNextInvoiceNumber);
router.get("/", getAllInvoices);
router.delete("/:id", deleteInvoice);

module.exports = router;