# Invoice Mate 📄✨

### A Modern Invoice Management System
Invoice Mate is a full-stack web application designed for small businesses to generate, manage, and export professional invoices.
It features a real-time preview, persistence across page refreshes, and automated PDF generation.

---

## 🚀 Tech Stack

**Frontend:**
* **React.js** - For building a dynamic user interface.
* **Tailwind CSS** - For modern, responsive styling.
* **React Icons & Lucide React** - For intuitive UI elements.
* **Axios** - For seamless API communication.
* **jsPDF & html2canvas** - For client-side PDF generation.

**Backend:**
* **Node.js & Express.js** - Scalable server-side logic.
* **MongoDB (Local/Cloud)** - NoSQL database for flexible data storage.
* **Mongoose** - For elegant data modeling.

---

## 🛠️ Key Features
* **real-time invoice preview:** updates as the user fills in the form.
* **PDF Export / Print:**  lets the user download the invoice as a PDF
* **Soft Deletion:** Invoices are archived with a `deletedAt` timestamp instead of permanent removal.
* **Dynamic Sequencing:** Automated invoice numbering (INV-001, INV-002) synced with the database.
* **Draft System:** Save unfinished invoices to `localStorage` and resume later.
* **Persistence:** Form data survives page refreshes using an auto-save mechanism.

---

## 💻 Local Setup Instructions

Follow these steps to get the project running on your machine:

### 1. Prerequisites
* Install [Node.js](https://nodejs.org/)
* Install [MongoDB Community Server](https://www.mongodb.com/try/download/community)

### 2. Clone the Repository
* git clone https://github.com/pavithra21635/InvoiceMate-Invoice-Generating-Web-Application.git
* cd invoiceMate-invoice-generating-web-application

### 3. Background Configuration

* Navigate to the server folder: cd backend
* Install dependencies: npm install
* Create a .env file and add your local URI:
 
  * PORT=5000
  * MONGO_URI=mongodb://127.0.0.1:27017/invoice_mate_db

### 4. Frontend Configuration

* Navigate to the client folder: cd frontend
* Install dependencies: npm install
* Start the application: npm start

## 📸 Screenshots

<img width="1846" height="880" alt="image" src="https://github.com/user-attachments/assets/d4e7f13f-d612-4a5c-8467-7e3fb51e331e" />
<img width="1852" height="860" alt="image" src="https://github.com/user-attachments/assets/fb6f8bf3-7c9e-4dfc-99f6-de52f8cdfcdd" />
<img width="1852" height="872" alt="image" src="https://github.com/user-attachments/assets/c665a49a-b180-45ed-9711-3ae5a40ddacb" />

## ⚠️ Known Limitations & Future Improvements

Current Limitations:

   * PDF generation is handled client-side; extremely long invoices may split across pages unexpectedly.

Future Ideas:

  * User Authentication: Implementing JWT for private user accounts.
  * Multi-Currency Support: Allowing users to switch between LKR, USD, and EUR.
  * Dashboard Analytics: Visual charts showing monthly revenue and pending invoices.
  * Cloud Storage: Moving PDF storage from local downloads to AWS S3.





