import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaExpandArrowsAlt, FaCompressArrowsAlt } from "react-icons/fa";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/invoices");
      setInvoices(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const deleteInvoice = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice? It can be recovered by the admin later.")) {
      try {
      await axios.delete(`http://localhost:5000/api/invoices/${id}`);
      fetchInvoices(); 
      } catch (err) {
      alert("Error archiving invoice.");
      }
  
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100" >
      <h2 className="text-xl font-bold mb-6">Invoice Details</h2>
      
      <table className="w-full text-left text-xs border-collapse">
        <thead className="text-gray-400 border-b">
          <tr>
            <th className="pb-3 font-medium whitespace-nowrap">Invoice No</th>
            <th className="pb-3 font-medium">Issue Date</th>
            <th className="pb-3 font-medium">Due Date</th>
            <th className="pb-3 font-medium">Client Name</th>
            <th className="pb-3 font-medium ">Client Address</th>
            <th className="pb-3 font-medium ">Client Email</th>
            <th className="pb-3 font-medium ">Tax Percentage</th>
            <th className="pb-3 font-medium ">Discount Percentage</th>
            <th className="pb-3 font-medium">Sub Total</th>
            <th className="pb-3 font-medium">Total</th>
            <th className="pb-3 font-medium">notes</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <React.Fragment key={inv._id}>
             
              <tr className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-4 font-bold">{inv.invoiceNumber}</td>
                <td className="py-4 text-gray-600">{inv.issueDate}</td>
                <td className="py-4 text-gray-600">{inv.dueDate}</td>
                <td className="py-4 text-gray-600">{inv.client.name}</td>
                <td className="py-4 text-gray-600">{inv.client.address}</td>
                <td className="py-4 text-gray-600">{inv.client.email}</td>
                <td className="py-4 text-gray-600">{inv.taxPercentage}%</td>
                <td className="py-4 text-gray-600">{inv.discountPercentage}%</td>
                <td className="py-4 font-bold text-black">{inv.subtotal.toFixed(2)}</td>
                <td className="py-4 font-bold text-black">{inv.totalAmount.toFixed(2)}</td>
                <td className="py-4 text-gray-600">{inv.notes || "-"}</td>
                <td className="py-4">
                  <div className="flex justify-center gap-3`">
                    <button 
                      onClick={() => toggleExpand(inv._id)}
                      className="text-[#9F29B5] hover:scale-110 transition-transform"
                    >
                      {expandedId === inv._id ? <FaCompressArrowsAlt size={16}/> : <FaExpandArrowsAlt size={16}/>}
                    </button>
                    <button 
                      onClick={() => deleteInvoice(inv._id)}
                      className="text-red-500 hover:scale-110 transition-transform"
                    >
                      <FaTrash size={16}/>
                    </button>
                  </div>
                </td>
              </tr>

             
              {expandedId === inv._id && (
                <tr className="bg-[#fcfaff]">
                  <td colSpan="5" className="p-4 border-b">
                    <div className="grid grid-cols-3 text-gray-400 font-semibold mb-2 px-4">
                      <span>Item</span>
                      <span className="text-center">Qty</span>
                      <span className="text-right">Unit Price</span>
                    </div>
                    {inv.items.map((item, i) => (
                      <div key={i} className="grid grid-cols-3 px-4 py-2 border-t border-gray-100 text-gray-700">
                        <span>{item.description}</span>
                        <span className="text-center">{item.quantity}</span>
                        <span className="text-right">{item.unitPrice.toFixed(2)}</span>
                      </div>
                    ))}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}