import React, { useContext } from 'react'
import Logo from './Logo'
import { Link, useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut, useClerk, UserButton } from '@clerk/clerk-react'
import { AppContext, initialInvoiceData } from '../context/AppContext';


function Menubar() {
const {openSignIn}=useClerk();
const navigate=useNavigate();
const {setInvoiceData,setSelectedTemplate,setInvoiceTitle}=useContext(AppContext);

  const openLogin =()=>{
    openSignIn({});
  }
const  handleGenerateClick=()=>{
  setInvoiceData(initialInvoiceData);
  setSelectedTemplate("template1");
  setInvoiceTitle("New Invoice");

  navigate("/generate");

}
  return (

   <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div className='container py-2 '>
         <Link className="navbar-brand d-flex align-items-center" to="/">
          <Logo/>
          <span className='fw-bolder fs-4 mx-3' style={{ letterSpacing:'1px',color:'#0D6EFDB2'}}>
            Quick Invoice
            </span>
         </Link>

         <button 
  className='navbar-toggler'
  type='button'
  data-bs-toggle="collapse"
  data-bs-target="#navbarNav"
  aria-controls='navbarNav'
  aria-expanded='false'
  aria-label='Toggle navigation'
>
  <span className='navbar-toggler-icon'></span>
</button>


         <div className='collapse navbar-collapse hover-effect ' id='navbarNav'>
          <ul className='navbar-nav ms-auto align-items-center fs-5 '>
            <li className='nav-item'>
              <Link className='nav-link fw-medium ' to="/">Home</Link>
            </li>
           <SignedIn>
             <li className='nav-item'>
              <Link className='nav-link fw-medium ' to="/dashboard">Dashboard</Link>
            </li>
           <li className='nav-item'>
           <button className='nav-link fw-medium ' onClick={handleGenerateClick}>
            Generate
           </button>
           </li>
           <UserButton/>
           </SignedIn>
          <SignedOut>
             <li className='nav-item'>
           <button className='btn btn-primary rounded-pill px-4' onClick={openLogin}>
            Login/Signup
           </button>
           </li>
          </SignedOut>
          </ul>
         </div>
    </div> 
   </nav>

)
}

export default Menubar
          
