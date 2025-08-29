import { Facebook, Github, Linkedin, Twitter } from 'lucide-react';
import Logo from '../../components/Logo';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
// import { backgroundImage } from 'html2canvas/dist/types/css/property-descriptors/background-image';


function LandingPage() {

const navigate=useNavigate();

const onGenerateInvoice=()=>{
 navigate("/generate");
}

  const steps = [
  {
    number: '1',
    title: 'Enter Details',
    description: 'Quickly fill in your client’s information, item descriptions, quantities, and prices. Our intuitive form makes it a breeze.',
    color: '#3b82f6',
    bg: '#e0ecff'
  },
  {
    number: '2',
    title: 'Choose Template',
    description: 'Browse our gallery of professionally designed templates. Pick one that matches your brand and style.',
    color: '#15803d',
    bg: '#e1f3e6'
  },
  {
    number: '3',
    title: 'Preview Invoice',
    description: 'See exactly how your invoice will look before sending it. Make any last-minute adjustments with ease.',
    color: '#d97706',
    bg: '#fef3c7'
  },
  {
    number: '4',
    title: 'Download & Save',
    description: 'Download your invoice as a PDF, send it directly via email, or save it for your records and future reference.',
    color: '#0ea5e9',
    bg: '#dbeeff'
  }
];
  return (
    <div>

      {/* Hero Section  */}
      <section className="hero-section">
      <div className="hero-container">
        <h1>Effortless Invoicing. <br />Professional Results.</h1>
        <p>
          Stop wrestling with spreadsheets. QuickInvoice helps you create and send
          beautiful invoices in minutes, so you get paid faster.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-warning btn-lg fw-bold rounded-pill px-4" id='generate_text' onClick={onGenerateInvoice}>Generate Your First Invoice</button>
        </div>
      </div>
    </section>
 
   
 {/* Steps Section  */}
  <section className="steps-section">
      <h2 className="steps-title">Get Started in 4 Simple Steps</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div
              className="step-circle"
              style={{ backgroundColor: step.color }}
            >
              {step.number}
            </div>
            <h4 className="step-title">{step.title}</h4>
            <p className="step-desc">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
    
     {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">
            Why Choose <span className="text-primary">QuickInvoice?</span>
          </h2>

          {/* Feature 1 */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="border border-5" style={{ height: '300px' }}>
              <img src={assets.InvoicePage} alt="Dashboard Page"  height={292} width={628}/>
              </div>
                
            </div>
           <div className="col-md-6">
  <h4 className="fw-bold">Easily Customize Your Invoice</h4>
  <p className="text-muted">
    Create professional invoices in minutes with pre-built templates. Add your business logo, adjust fields, and personalize every detail.
  </p>
  <ul className="text-muted">
    <li>Choose from a variety of ready-to-use invoice templates</li>
    <li>Upload your business logo for a branded look</li>
    <li>Customize fields like item descriptions, taxes, and more</li>
  </ul>
</div>

          </div>

          {/* Feature 2 */}
          <div className="row align-items-center mb-5 flex-md-row-reverse">
            <div className="col-md-6 mb-3 mb-md-0">

              <div className="border border-5" style={{ height: '300px' }}>
              <img src={assets.DashboardPage} alt="Dashboard Page"  height={300} width={635}/>


              </div>
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold">Beautiful Dashboard</h4>
              <p className="text-muted">
                Live preview. Switch between invoices. Save, download, or delete in one click.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              {/* PLACEHOLDER IMAGE */}
              <div className="border  border-5" style={{ height: '300px' }}>
              <img src={assets.MailPage} alt="Mail Page "  height={310} width={635}/>

              </div>
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold">Send invoices instantly</h4>
              <p className="text-muted">
                Send invoices instantly without leaving the app. One click to send. Unlimited usage.
              </p>
            </div>
          </div>

          {/* Feature 4  */}
           <div className="row align-items-center mb-5 flex-md-row-reverse">
            <div className="col-md-6 mb-3 mb-md-0">
              {/* PLACEHOLDER IMAGE */}
              <div className="border border-5" style={{ height: '300px' }}>
              <img src={assets.ActionPage} alt="Mail Page "  height={310} width={635}/>

              </div>
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold">Invoice Preview with Action Buttons</h4>
              <p className="text-muted">
                Live preview. Switch between invoices. Save, download, or delete in one click.
              </p>
            </div>
          </div>
        </div>
      </section>





   <section class="cta-section">
  <div class="cta-container">
    <h2>Ready to Streamline Your Invoicing?</h2>
    <p>Join thousands of freelancers and small businesses who trust QuickInvoice.
    Start creating professional invoices today – it's fast, easy, and effective!</p>
    <button  class="cta-button" onClick={onGenerateInvoice}>Start Generating Invoices Now</button>
    <p class="note">(This will lead to the invoice generation interface)</p>
  </div>
</section>

<footer class="footer">
  <div class="footer-content">
  <Logo/>
    <p class="footer-title">QuickInvoice</p>
    <p class="footer-text">
       &copy; {new Date().getFullYear()}
       QuickInvoice. All Rights Reserved.
    Crafted with love for freelancers and small businesses.</p>
  </div> 

  <div className="social-handle">
  <a href="https://www.linkedin.com/in/21sk12/" target="_blank" rel="noopener noreferrer">
    <Linkedin />
  </a>
  <a href="https://github.com/Sk2112" target="_blank" >
    <Github />
  </a>
</div>


</footer>

    </div>
  )
}

export default LandingPage