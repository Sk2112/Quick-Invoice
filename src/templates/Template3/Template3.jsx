import React from 'react';
import './Template3.css';

export const Template3 = ({ data }) => {
    console.log(data);
    
   
  return (
    <div className="template3-container">
      {/* Header */}
      <header className="template3-header">
        <div className="company-details">
          {data.companyLogo && (
            <img src={data.companyLogo} alt="Logo" className="company-logo" />
          )}
          <h2>{data.companyName}</h2>
          <p>{data.companyAddress}</p>
          <p>Phone: {data.companyPhone}</p>
       
        </div>
        <div className="invoice-info">
          <h1>{data.title}</h1>
          <p><strong>Invoice Number:</strong> {data.invoiceNumber}</p>
          <p><strong>Invoice Date:</strong> {data.invoiceDate}</p>
          <p><strong>Due Date:</strong> {data.paymentDate}</p>
        </div>
      </header>

      {/* Billing Section */}
      <section className="template3-billing">
        <div>
          <h3>Billed To</h3>
          <p><strong>{data.billingName}</strong></p>
          <p>{data.billingAddress}</p>
          <p>Phone: {data.billingPhone}</p>
        </div>
        {data.shippingName && (
          <div>
            <h3>Shipped To</h3>
            <p><strong>{data.shippingName}</strong></p>
            <p>{data.shippingAddress}</p>
            <p>Phone: {data.shippingPhone}</p>
          </div>
        )}
      </section>

      {/* Items Table */}
      <table className="template3-items">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Item</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.qty}</td>
              <td>Rs {Number(item.amount).toFixed(2)}</td>
              <td>Rs {(item.qty * item.amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="template3-summary">
        <p><strong>Subtotal:</strong> Rs {data.subTotal}</p>
        {data.tax > 0 && (
          <p><strong>Tax ({data.tax}%):</strong> Rs {data.taxAmount}</p>
        )}
        <p className="total"><strong>Total:</strong> Rs {data.total}</p>
      </div>

      {/* Bank Info */}
      {(data.accountName || data.accountNumber || data.accountIfscCode) && (
        <section className="template3-bank">
          <h3>Bank Details</h3>
          {data.accountName && <p><strong>Account Holder:</strong> {data.accountName}</p>}
          {data.accountNumber && <p><strong>Account Number:</strong> {data.accountNumber}</p>}
          {data.accountIfscCode && <p><strong>IFSC Code:</strong> {data.accountIfscCode}</p>}
        </section>
      )}
      

      {/* Notes */}
      {data.notes && (
        <section className="template3-notes">
          <h3>Notes</h3>
          <p>{data.notes}</p>
        </section>
      )}

    </div>
  );
};
