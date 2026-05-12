import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DraftsPage() {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("invoice_drafts") || "[]");
    setDrafts(saved);
  }, []);

  const deleteDraft = (id) => {
    const updated = drafts.filter(d => d.draftId !== id);
    localStorage.setItem("invoice_drafts", JSON.stringify(updated));
    setDrafts(updated);
  };

  const resumeDraft = (draft) => {
    navigate("/invoices", { state: { draftData: draft } });
  };

  return (
   <div className="flex min-h-screen bg-[#f8f9fb] font-sans">
      <Navbar />

      <main className="flex-1 transition-all duration-300 ml-0 md:ml-64 pt-[90px]">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Invoice Drafts</h1>
          
          {drafts.length === 0 ? (
            <div className="bg-white p-10 rounded-xl shadow-sm text-center border border-dashed border-gray-300">
              <p className="text-gray-500">No drafts found. Work on an invoice to save progress!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drafts.map((draft) => (
                <div
                  key={draft.draftId}
                  className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow relative group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-purple-100 text-[#9F29B5] text-[10px] font-bold px-2 py-1 rounded">
                      DRAFT #{draft.invoiceNo || "NEW"}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => resumeDraft(draft)}
                        className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors"
                        title="Resume Editing"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => deleteDraft(draft.draftId)}
                        className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete Draft"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-800 mb-1">
                    {draft.clientName || "Unnamed Client"}
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                    <FaCalendarAlt /> Last saved: {draft.lastSaved}
                  </p>

                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {draft.items?.length || 0} Items
                    </span>
                    <span className="font-bold text-[#9F29B5]">
                      Rs. {Number(draft.totalAmount || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}