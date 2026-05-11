import { MdDelete } from "react-icons/md";

export default function InvoiceForm({ invoiceData, onChange, setInvoiceData }) {

  const today = new Date().toISOString().split("T")[0];
 
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceData.items];

    if (field === "quantity" || field === "unitPrice"  || field ==="discountPercentage" || field ==="taxPercentage" ) {
     
        if (value !== "" && value < 0) return; 
    }

    updatedItems[index][field] = value;
    setInvoiceData({ ...invoiceData, items: updatedItems });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: "", quantity: 1, unitPrice: 0 }]
    });
  };

  const removeItem = (index) => {
    const updatedItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: updatedItems });

   
    
  };

  return (
    <div className="flex-1 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold border-b border-gray-300 pb-3 mb-6">Invoice Form</h2>

      <div className="bg-[#E1C6FC] text-gray-800 px-4 py-2 rounded-md mb-6 font-semibold">
        Invoice Details
      </div>
      <div className="grid grid-cols-1 gap-4 mb-8 pl-4">
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium">Invoice No :</label>
          <input 
            name="invoiceNo" 
            value={invoiceData.invoiceNo}
            readOnly
            className="flex-1 border-b border-gray-200 outline-none p-1 text-sm bg-[#fcfaff] text-[#9F29B5] font-bold cursor-not-allowed"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium">Issued Date :</label>
          <input 
            type="date" 
            name="issuedDate" 
            value={invoiceData.issuedDate}
            min={today}
            onChange={onChange} 
            className="flex-1 border-b border-gray-300 focus:border-[#9F29B5] outline-none p-1 text-sm text-gray-400" 
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium">Due Date :</label>
          <input 
            type="date" 
            name="dueDate" 
            value={invoiceData.dueDate}
            min={invoiceData.issuedDate || today}
            onChange={onChange} 
            className="flex-1 border-b border-gray-300 focus:border-[#9F29B5] outline-none p-1 text-sm text-gray-400" 
          />
        </div>
      </div>

      <div className="bg-[#E1C6FC] text-gray-800 px-4 py-2 rounded-md mb-6 font-semibold flex items-center">
        Client Details <span className="text-red-500 ml-1">●</span>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-8 pl-4">
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium">Client Name :</label>
          <input 
            name="clientName" 
            value={invoiceData.clientName}
            onChange={onChange} 
            placeholder="Enter Name Here" 
            className="flex-1 border-b border-gray-300 focus:border-[#9F29B5] outline-none p-1 text-sm" 
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium">Client Address :</label>
          <input 
            name="clientAddress" 
            value={invoiceData.clientAddress}
            onChange={onChange} 
            placeholder="Enter Address Here" 
            className="flex-1 border-b border-gray-300 focus:border-[#9F29B5] outline-none p-1 text-sm" 
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium">Client Email :</label>
          <input 
            type="email"
            name="clientEmail" 
            value={invoiceData.clientEmail}
            onChange={onChange} 
            placeholder="Enter Email Here" 
            className="flex-1 border-b border-gray-300 focus:border-[#9F29B5] outline-none p-1 text-sm" 
          />
        </div>
      </div>

      <div className="bg-[#E1C6FC] text-gray-800 px-4 py-2 rounded-md mb-4 font-semibold">
        Line Items
      </div>
      <table className="w-full text-sm mb-4">
        <thead>
          <tr className="text-left border-b border-gray-200 text-gray-600">
            <th className="py-2 font-medium">Description</th>
            <th className="font-medium text-center">Quantity</th>
            <th className="font-medium text-center">Unit Price(Rs)</th>
            
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-3">
                <input 
                  value={item.description} 
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)} 
                  className="w-full border rounded px-2 py-1 outline-none focus:border-[#9F29B5]" 
                />
              </td>
              <td className="px-2">
                <input 
                  type="number"
                  min="0" 
                  value={item.quantity} 
                  onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))} 
                  className="w-16 border rounded text-center py-1 mx-auto block outline-none" 
                />
              </td>
              <td className="px-2">
                <input 
                  type="number" 
                  min="0"
                  value={item.unitPrice} 
                  onChange={(e) => handleItemChange(index, 'unitPrice', Number(e.target.value))} 
                  className="w-24 border rounded text-center py-1 mx-auto block outline-none" 
                />
              </td>
              <td>
                <button 
                  onClick={() => removeItem(index)} 
                  className="text-[#9F29B5] hover:bg-purple-50 p-2 rounded-full mx-auto block"
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button 
        onClick={addItem} 
        className="w-full py-2 border-2 border-[#E1C6FC] rounded-lg text-[#9F29B5] font-bold text-sm hover:bg-purple-50 transition-colors"
      >
        + Add New Items
      </button>

      <div className="mt-8 space-y-4 pl-4">
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium">Discount (%) :</label>
          <input 
            type="number"
            name="discountPercentage" 
            min="0"
            value={invoiceData.discountPercentage}
            onChange={onChange} 
            placeholder="Enter Discount Here" 
            className="flex-1 border-b border-gray-300 focus:border-[#9F29B5] outline-none p-1 text-sm text-gray-600" 
          />
        </div>
        <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
          <label className="w-32 text-sm font-medium">Tax (%) :</label>
          <input 
            type="number"
            name="taxPercentage" 
            min="0"
            value={invoiceData.taxPercentage}
            onChange={onChange} 
            placeholder="Enter Tax Here" 
            className="flex-1 border-b border-gray-300 focus:border-[#9F29B5] outline-none p-1 text-sm text-gray-600" 
          />
        </div>
      </div>

      
      <div className="mt-10">
        <div className="bg-[#E1C6FC] text-gray-800 px-4 py-2 rounded-md mb-4 font-semibold">
          Notes / Payment Terms
        </div>
        <textarea 
          name="notes"
          value={invoiceData.notes}
          onChange={onChange}
          placeholder="Enter additional notes or payment terms here..."
          className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:border-[#9F29B5] outline-none text-sm resize-none"
        />
      </div>
    </div>
  );
}