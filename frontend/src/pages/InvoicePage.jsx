import React, { useState } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoicePreview from "../components/InvoicePreview";
import { MdPictureAsPdf } from "react-icons/md";
import Navbar from "../components/Navbar";


export default function InvoicePage() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: "",
    issuedDate: "",
    dueDate: "",
    clientName: "",
    clientAddress: "",
    clientEmail: "",
    items: [{ description: "", quantity: 0, unitPrice: 0 }],
    discountPercentage: 0,
    taxPercentage: 0,
    notes: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  

  return (
    <div className="flex min-h-screen bg-[#f8f9fb] font-sans">
      <Navbar />

      <main className="flex-1 transition-all duration-300 ml-0 md:ml-64 pt-[90px]">
        <div className="flex justify-end px-8 py-4">
          <button className="flex items-center gap-2 bg-[#9F29B5] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#8e24a3] transition-colors font-bold text-sm">
            <MdPictureAsPdf size={20} />
            PDF
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 px-8 pb-8">
          <InvoiceForm 
            invoiceData={invoiceData} 
            onChange={handleInputChange} 
            setInvoiceData={setInvoiceData} 
          />
          <InvoicePreview invoiceData={invoiceData} />
        </div>
      </main>
    </div>
  );
}