import React, { useState, useEffect } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoicePreview from "../components/InvoicePreview";
import { MdPictureAsPdf,MdSave } from "react-icons/md";
import Navbar from "../components/Navbar";
import axios from "axios";


export default function InvoicePage() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: "",
    issuedDate: "",
    dueDate: "",
    clientName: "",
    clientAddress: "",
    clientEmail: "",
    items: [{ description: "", quantity: "", unitPrice: "" }],
    discountPercentage: "",
    taxPercentage: "",
    notes: ""
  });

  useEffect(() => {

        const today = new Date().toISOString().split("T")[0];
      
    
      setInvoiceData(prev => ({ 
        ...prev, 
        issuedDate: prev.issuedDate || today 
      }));

    const fetchNextNumber = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/invoices/next-number");
        setInvoiceData(prev => ({ ...prev, invoiceNo: response.data.nextNumber }));
      } catch (error) {
        console.error("Failed to fetch invoice number:", error);
      }
    };

    fetchNextNumber();
  }, []);


  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const saveInvoice = async () => {
    try {
    
      const payload = {
        invoiceNumber: invoiceData.invoiceNo,
        issueDate: invoiceData.issuedDate,
        dueDate: invoiceData.dueDate,
        biller: {
          name: "Invoice Mate Pvt(Ltd)",
          address: "No : 4, Colombo 02, Sri Lanka",
          email: "inv@gmail.com",
          contact: "0767564534",
        },
        client: {
          name: invoiceData.clientName,
          address: invoiceData.clientAddress,
          email: invoiceData.clientEmail,
        },
        items: invoiceData.items,
        taxPercentage: invoiceData.taxPercentage,
        discountPercentage: invoiceData.discountPercentage,
        notes: invoiceData.notes,
      };

      const response = await axios.post("http://localhost:5000/api/invoices", payload);
      
      if (response.status === 201) {
        alert("✅ Invoice saved successfully to MongoDB!");
      }
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("❌ Error: " + (error.response?.data?.message || "Internal Server Error"));
    }
  };

  

  return (
    <div className="flex min-h-screen bg-[#f8f9fb] font-sans">
      <Navbar />

      <main className="flex-1 transition-all duration-300 ml-0 md:ml-64 pt-[90px]">
        <div className="flex justify-end gap-4 px-8 py-4">

          <button 
            onClick={saveInvoice}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition-colors font-bold text-sm"
          >
            <MdSave size={20} />
            SAVE INVOICE
          </button>


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