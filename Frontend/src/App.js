import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ChatPage from './ChatPage';
import './InvoiceForm.css';
import AdminLiveClass from './components/AdminLiveClass';
import Home from './components/Home';
const App = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  const handleFormSubmit = (data) => {
    setInvoiceData(data);
  };
  console.log(invoiceData)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:userId/:targetUserId" element={<ChatPage />} />
        <Route path="/admin/live" element={<AdminLiveClass />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
