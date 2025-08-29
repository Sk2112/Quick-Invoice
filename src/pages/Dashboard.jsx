import React, { useContext, useEffect, useState } from "react";
import { AppContext, initialInvoiceData } from "../context/AppContext.jsx";
import { getAllInvoices } from "../service/InvoiceService";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { formatDate } from "../util/formatInvoiceData.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const { baseUrl,setInvoiceData,setSelectedTemplate,setInvoiceTitle} = useContext(AppContext);
 const nagivate=useNavigate();
 const {getToken}= useAuth();




  useEffect(() => {
    const fetchInvoices = async () => {
      // try catch
      try {
        const token = await getToken();
        const response = await getAllInvoices(baseUrl,token);
        setInvoices(response.data);
        console.log("Getting invoices and respone" + response);
      } catch (error) {
        toast.error("Failed to Load the Invoices", error);
        console.log("erorr bro");
      }

      // try catch
    };
    fetchInvoices();
  }, [baseUrl]);


const handleViewClick=(invoice)=>{
  setInvoiceData( invoice);
  setSelectedTemplate(invoice.template || 'template1');
  setInvoiceTitle(invoice.title || "New Invoice");
  nagivate('/preview');
}

const handleCreateNew=()=>{
// reset to in
setInvoiceTitle("New Invoice");
setSelectedTemplate("template1");
setInvoiceData(initialInvoiceData);
nagivate('/generate');
}



  return <div className="container py-5 py-3 mt-4">
    <h2 className="text-center py-3 text-uppercase text-secondary"><strong>Welcome to Dashboard</strong></h2>
   <div className="row row-cols-1 rol-cols-sm-2 row-cols-md-3 rows-row-cols-lg-5 g-4  ">

    {/* Create New Invoice Card */}

   <div className="col">
   <div className="card h-100 d-flex justify-content-center align-items-center border border-2 border-light shadow-sm cursor-pointer hover:bg-primary" style={{
    minHeight:'270px'}}
    onClick={handleCreateNew}
    >
  <Plus size={48}/>
  <p className="mt-3 fw-medium">Create New Invoice </p>
   </div>
   </div>



{/* Render the Existing Invoice */}

{invoices.map((invoice, idx) => (
  <div className="col" key={idx}>
    <div
      className="card h-100 shadow-sm cursor-pointer border border-2 border-secondary"
      style={{ minHeight: "270px" }}
      onClick={()=>handleViewClick(invoice)}
    >
      {invoice.thumbnailUrl && (
        <img
          src={invoice.thumbnailUrl}
          alt="Invoice Thumbnail"
          className="border border-top-2"
          style={{ height: "350px", objectFit: "cover" }}
        />
      )}

      <div className="card-body">
        <h6 className="card-title mb-1">{invoice.title}</h6>
        <small className="text-muted">
          Last Updated: {formatDate(invoice.createdAt)}
        </small>
      </div>
    </div>
  </div>
))}

   </div>
  </div>;
};

export default Dashboard;
