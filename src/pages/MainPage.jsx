import {  Pencil } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import InvoiceForm from '../components/InvoiceForm';
import TemplateGrid from '../components/TemplateGrid';
import { useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

const MainPage = () => {

  const [isEditingTittle,setIsEditingTittle]=useState(false);
const
 { invoiceTitle, setInvoiceTitle,
  invoiceData,setInvoiceData,
setSelectedTemplate,
} = useContext(AppContext);

const navigate=useNavigate()



const handleTemplateClick = (templatesId) => {
  const hasInvalidItem = invoiceData.items.some(
    (item) => !item.qty || !item.amount || item.qty <= 0 || item.amount <= 0
  );

  if (hasInvalidItem) {
    toast.error("Please Enter Details");
    return;
  }

  setSelectedTemplate(templatesId);
  console.log(templatesId);
  navigate(`/preview`);
};







  const handleTitleChange=(e)=>{
    const newTitle=e.target.value;
    setInvoiceTitle(newTitle);
  setInvoiceData((prev)=>({
    ...prev,
    title:newTitle,
  }));
  }

  const handleTitleEdit=()=>{
setIsEditingTittle(true);
  }
  const handleTitleBlur=()=>{
  setIsEditingTittle(false);
  }
  return (
    <div className=" mainpage container-fluid bg-light min-vh-100 py-4">
      <div className="container">

        {/* Title bar */}
        <div className="bg-white border rounded shadow-sm p-3 mb-4">
          <div className="d-flex align-items-center">
            {isEditingTittle? (
              <input type='text' className='form-control me-2'
              autoFocus
               onBlur={handleTitleBlur}
               onChange={handleTitleChange}
               value={invoiceTitle}
              />
            ):(
              <>
                <h5 className="mb-0 me-2">{invoiceTitle}</h5>
                <button 
                onClick={handleTitleEdit}
                className="btn btn-sm p-0 border-0 bg-transparent"
                
                >
                  <Pencil className='text-primary' size={20}/>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Invoice Form and Template Grid */}
        <div className="row g-4 align-items-stretch">

          {/* Invoice Form */}
          <div className="col-12 col-lg-6 d-flex">
            <div className="bg-white border rounded shadow-sm p-4 w-100">
              <InvoiceForm/>
            </div>
          </div>

          {/* Template Grid */}
          <div className="col-12 col-lg-6 d-flex">
            <div className="bg-white border rounded shadow-sm p-4 w-100">
           <TemplateGrid onTemplateClick={handleTemplateClick}/>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MainPage;
