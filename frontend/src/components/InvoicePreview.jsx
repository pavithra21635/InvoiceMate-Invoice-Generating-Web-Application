import logo from "../assets/Logo.png";

export default function InvoicePreview({ invoiceData }) {

  const subtotal = invoiceData.items.reduce((acc, item) => {
  const qty = Number(item.quantity) || 0;
  const price = Number(item.unitPrice) || 0;
  return acc + (qty * price);
   }, 0);
  const taxAmount = subtotal * (invoiceData.taxPercentage / 100);
  const discountAmount = subtotal * (invoiceData.discountPercentage / 100);
  const totalAmount = subtotal + taxAmount - discountAmount;

  return (
    <>
      <div className="w-full lg:w-[480px] bg-white p-10 rounded-xl shadow-xl border border-gray-100 h-fit sticky top-28 font-sans">
        <div className="flex items-center gap-4 mb-6">
          <img src={logo} alt="Logo" className="h-10" />
          <h2 className="text-2xl font-bold">Invoice Mate</h2>
        </div>

        <div className="border border-[#E1C6FC] rounded-lg p-6 mb-8 text-xs relative overflow-hidden">
          <div className="mb-4 text-gray-500">Invoice No : <span className="text-black font-bold">{invoiceData.invoiceNo}</span></div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-gray-400 mb-1">Biller :</p>
              <p className="font-bold leading-tight text-black text-[11px]">
                Invoice Mate Pvt(Ltd)<br />
                No : 4, Colombo 02,<br />
                Sri Lanka
              </p>
              <p className="text-[10px] text-gray-500 mt-1">inm@gmail.com</p>
              <p className="text-[10px] text-gray-500">0767564534</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Client :</p>
              <p className="font-bold leading-tight text-black text-[11px]">
                {invoiceData.clientName || "Client Name"}<br />
                {invoiceData.clientAddress || "Address"}<br />
                <span className="text-[10px] font-normal text-gray-500">{invoiceData.clientEmail}</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4">
            <div><p className="text-gray-400">Issued Date :</p><p className="font-bold text-black">{invoiceData.issuedDate || "2026-5-8"}</p></div>
            <div><p className="text-gray-400">Due Date :</p><p className="font-bold text-black">{invoiceData.dueDate || "2026-5-8"}</p></div>
          </div>
        </div>

        <div className="bg-[#E1C6FC] px-4 py-1.5 rounded-md text-sm font-semibold mb-4 text-gray-800">Line Items</div>
        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-4 text-[10px] text-gray-400 uppercase tracking-widest border-b pb-1">
            <span>Description</span><span className="text-center">Qty</span><span className="text-center">Price</span><span className="text-right">Total</span>
          </div>
          {invoiceData.items.map((item, index) => {
          
            const qty = Number(item.quantity) || 0;
            const price = Number(item.unitPrice) || 0;
            const itemTotal = qty * price;

            return (
              <div key={index} className="grid grid-cols-4 text-xs font-medium border-b border-gray-50 pb-2">
                <span className="truncate pr-2">{item.description || "Item"}</span>
                <span className="text-center">{qty}</span>
                <span className="text-center">{price.toFixed(2)}</span> 
                <span className="text-right">{itemTotal.toFixed(2)}</span>
              </div>
            );
          })}
         
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600"><span>Sub Total :</span><span className="font-bold text-black">Rs. {(Number(subtotal) || 0).toFixed(2)}</span></div>
          <div className="flex justify-between text-gray-600"><span>Applied Tax :</span><span className="font-bold text-black">Rs. {taxAmount.toFixed(2)}</span></div>
          <div className="flex justify-between text-gray-600 border-b pb-2"><span>Discount :</span><span className="font-bold text-black">Rs. {discountAmount.toFixed(2)}</span></div>
          <div className="flex justify-between text-lg font-black pt-2 text-black"><span>Grand Total :</span><span>Rs. {totalAmount.toFixed(2)}</span></div>
        </div>

        <div className="mt-10 pt-4 border-t border-gray-100">
          <p className="text-sm font-bold text-gray-800 mb-1">Notes :</p>
          <p className="text-xs text-gray-400 break-words leading-relaxed italic">
            {invoiceData.notes || "No additional notes provided."}
          </p>
        </div>
      </div>
    </>
  );
}