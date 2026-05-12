import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm";
import InvoicePreview from "../components/InvoicePreview";
import { MdPictureAsPdf,MdSave } from "react-icons/md";
import Navbar from "../components/Navbar";
import axios from "axios";
import { domToCanvas } from 'modern-screenshot';
import jsPDF from "jspdf";


export default function InvoicePage() {

  const location = useLocation();
  const navigate = useNavigate();
  
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

  const INITIAL_INVOICE_STATE = {
  invoiceNo: "",
  issuedDate: new Date().toISOString().split("T")[0],
  dueDate: "",
  clientName: "",
  clientAddress: "",
  clientEmail: "",
  items: [{ description: "", quantity: "", unitPrice: "" }],
  discountPercentage: "",
  taxPercentage: "",
  notes: ""
  };


  useEffect(() => {

    const today = new Date().toISOString().split("T")[0];

    if (location.state && location.state.draftData) {
      setInvoiceData(location.state.draftData);
      
      navigate(location.pathname, { replace: true, state: {} });
    } 
    else {
      const fetchNextNumber = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/invoices/next-number");
          
          setInvoiceData(prev => ({ 
            ...prev, 
            invoiceNo: response.data.nextNumber,
            issuedDate: prev.issuedDate || today 
          }));
        } catch (error) {
          console.error("Failed to fetch invoice number:", error);
          
          setInvoiceData(prev => ({ ...prev, issuedDate: prev.issuedDate || today }));
        }
      };
      
      fetchNextNumber();
    }
  }, [location.state, navigate]);


  

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

        await downloadPDF();
       
        

        
      setInvoiceData(INITIAL_INVOICE_STATE);
      
      
      const nextNum = await axios.get("http://localhost:5000/api/invoices/next-number");
      setInvoiceData(prev => ({ ...prev, invoiceNo: nextNum.data.nextNumber }));
      }
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("❌ Error: " + (error.response?.data?.message || "Internal Server Error"));
    }
  };


     const downloadPDF = async () => {
  const node = document.getElementById('invoice-download');
  
  try {
    
    const canvas = await domToCanvas(node, {
      scale: 2,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${invoiceData.invoiceNo || 'Invoice'}.pdf`);
  } catch (error) {
    console.error('Snapshot failed:', error);
  }
};

const saveAsDraft = () => {
  const existingDrafts = JSON.parse(localStorage.getItem("invoice_drafts") || "[]");
  
  const draftData = {
    ...invoiceData,
    draftId: invoiceData.draftId || Date.now(), 
    lastSaved: new Date().toLocaleString()
  };

  const updatedDrafts = invoiceData.draftId 
    ? existingDrafts.map(d => d.draftId === draftData.draftId ? draftData : d)
    : [draftData, ...existingDrafts];

  localStorage.setItem("invoice_drafts", JSON.stringify(updatedDrafts));
  alert("Draft saved to browser storage!");
};

  return (
    <div className="flex min-h-screen bg-[#f8f9fb] font-sans">
      <Navbar />

      <main className="flex-1 transition-all duration-300 ml-0 md:ml-64 pt-[90px]">
        <div className="flex justify-end gap-4 px-8 py-4">
          <button
            onClick={saveAsDraft}
            className="flex items-center gap-2 bg-white text-[#9F29B5] border-2 border-[#9F29B5] px-6 py-2 rounded-md shadow-sm hover:bg-purple-50 transition-colors font-bold text-sm"
          >
            <MdSave size={20} />
            SAVE AS DRAFT
          </button>

          <button
          onClick={saveInvoice}
           className="flex items-center gap-2 bg-[#9F29B5] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#8e24a3] transition-colors font-bold text-sm">
            <MdPictureAsPdf size={20} />
            SAVE & DOWNLOAD PDF
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