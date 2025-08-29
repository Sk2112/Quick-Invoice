import React, { useContext, useEffect, useRef, useState } from "react";
import { templates } from "../assets/assets";

import { AppContext } from "../context/AppContext";
import InvoicePreview from "../components/InvoicePreview";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { deleteInvoices, saveInvoice, sendInvoices } from "../service/InvoiceService";
import html2canvas from "html2canvas";
import { uploadInvoiceThumbnail } from "../service/cloudinaryService";
import { generatePdfFromElement } from "../util/pdfUtil";
import { useAuth, useUser } from "@clerk/clerk-react";


function Preview() {
  const previewRef = useRef();
  const { selectedTemplate, invoiceData, setSelectedTemplate, baseUrl } =
  useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const[showModal,setShowModal]=useState(false);
  const[downlaoding,setDownloading]=useState(false);
  const[customerEmail,setCustomerEmail]=useState("");
  const [emailing,setEmailing]=useState(false);
const {getToken} =useAuth();
const {user}=useUser();



  const handleSaveAndExit = async () => {
    try {
      setLoading(true);
   const canvas=await html2canvas(previewRef.current,{
      scale: window.devicePixelRatio || 2,
    useCORS:true,
    backgroundColor:"transparent",
    scrollY:-window.scrollY,
      });
      const imageData=canvas.toDataURL("image/png");
     const thumbnailUrl=  await uploadInvoiceThumbnail(imageData);
      const payload = {
        ...invoiceData,
        clerkId:user.id,
        thumbnailUrl,
        template: selectedTemplate,
      };
    const token= await  getToken();
      const response = await saveInvoice(baseUrl, payload,token);
      if (response.status === 200) {
        console.log("Invoice Saved Succeefully")
        toast.success("Invoice Saved Successfully");
        navigate("/dashboard");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save the invoice: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToDashboard=()=>{
    navigate('/dashboard');
  }


const handleDelete = async () => {
  if (!invoiceData.id) {
    toast.success("Invoice deleted successfully.");
    navigate("/dashboard");
    return;
  }

  try {
    const token = await getToken();
    const response = await deleteInvoices(baseUrl, invoiceData.id, token);

    if (response.status === 204) {
      toast.success("Invoice deleted successfully.");
      navigate("/dashboard");
    } else {
      toast.error("Unable to delete invoice. Status: " + response.status);
    }
  } catch (error) {
    console.error("Delete error:", error);
    toast.error("Failed to delete invoice: " + error.message);
  }
};


const handleDownloadPdf = async () => {
  if (!previewRef.current) return;

  try {
    // setIsExporting(true); 
    setDownloading(true);

    
    setTimeout(async () => {
      await generatePdfFromElement(previewRef.current, `invoice_${Date.now()}.pdf`);
      // setIsExporting(false); 
      setDownloading(false);
    }, 300); 
  } catch (error) {
    toast.error("Failed to generate Invoice: " + error.message);
    // setIsExporting(false);
    setDownloading(false);
  }
};




const handleSendEmail=async()=>{
  if(!previewRef.current || !customerEmail){
    return toast.error("Please Enter A Valid Mail");
  }

  try {
    setEmailing(true);
   const pdfBlob= await generatePdfFromElement(previewRef.current,`invoice_${Date.now()}.pdf`,true);
   const formData=new FormData;
   formData.append("file",pdfBlob,`invoice_${Date.now()}.pdf`);
   formData.append("email",customerEmail);
    const token= await  getToken();

const response= await sendInvoices(baseUrl,formData,token);
  if(response.status===200){
    toast.success("Email Sent Successfully");
    setShowModal(false);
    setCustomerEmail("");
  }else{
    toast.error("Failed to send Mail");
  }
  } catch (error) {
    toast.error("Failed to send mail db"+error.message);
    console.log(error);
  }
  finally{
      setEmailing(false);
  }
}



useEffect(()=>{
  if(!invoiceData || !invoiceData.items?.length){
    toast.error("Invoice Data is Empty");
    navigate('/dashboard');
  }
},[invoiceData,navigate]);

  
  return (
    <div className=" previewpage container-fluid d-flex flex-column p-3 min-vh-100">
      {/* Actionbutton  */}
      <div className="d-flex flex-column align-center mb-4 gap-3">
        {/* List of Temokate button  */}
        <div className="d-flex gap-2 flex-wrap justify-content-center">
          {templates.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedTemplate(id)}
              className={`btn btn-sm rounded-pill p-2 ${
                selectedTemplate === id
                  ? "btn-warning"
                  : "btn-outline-secondary"
              }`}
              style={{ minWidth: "100px", height: "38px" }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* list of action button  */}
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            onClick={handleSaveAndExit}
            disabled={loading}
          >
            {loading==true && <Loader2 className="mt-2 spin-aniamtion" size={18}/>}
            {loading? "Saving..." : "Save And Exit"}
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete Invoice</button>
          <button className="btn btn-secondary" onClick={handleGoToDashboard}>Back to Dashboard</button>
          <button className="btn btn-info" onClick={()=>setShowModal(true)}>Send Mail</button>

          <button className="btn btn-success d-flex align-items-center justify-content-center" disabled={loading} onClick={handleDownloadPdf}>
            {downlaoding  &&
            <Loader2 className="me-2 spin-animation" size={18}/>
            }
            {downlaoding ? "Downloading...":"Download Pdf"}
          </button>

        </div>
      </div>

      {/* Disply the invoce preview */}

      <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-center bg-light py-3  ">
        <div ref={previewRef} className="invoice-preview ">
          <InvoicePreview
            invoiceData={invoiceData}
            template={selectedTemplate}
          />
        </div>
      </div>

      {showModal && (
        <div className="modal d-block " tabIndex='-1' role="dialog" style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
        <div className="modal-dialog" role="document">
        <div className="modal-content">
             <div className="modal-header">
           <h5 className="modal-title">Send Invoice</h5>
           <button type="button" className="btn-close" onClick={()=>setShowModal(false)}></button>
             </div>

                       <div className="modal-body">
                        <input type="email" className="form-control" placeholder="Customer Mail" onChange={(e)=>setCustomerEmail(e.target.value)} value={customerEmail}  />
                       </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSendEmail} disabled={emailing}>
                          {emailing ? "Sending..." :"Send"}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={()=>showModal(false)}>Cancel</button>
                      </div>
        </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default Preview;
