import React from 'react';
import './Template2.css';

export const Template2 = ({ data }) => {
  return (
    <div className="template2 container">
      {/* Header */}
      <header className="header">
        <div className="left">
          {data.companyLogo && (
            <img src={data.companyLogo} alt="Company Logo" className="logo" />
          )}
          <div className="company-info">
            <h2>{data.companyName}</h2>
            <p>{data.companyAddress}</p>
            <p>Phone: {data.companyPhone}</p>
          </div>
        </div>


        <div className="right">
          <h1 className="invoice-heading">{data.title}</h1>
          <p><strong>Invoice Number:</strong> {data.invoiceNumber}</p>
          <p><strong>Invoice Date:</strong> {data.invoiceDate}</p>
          <p><strong>Due Date:</strong> {data.paymentDate}</p>
        </div>
      </header>

      {/* Billing & Shipping */}
      <section className="billing-shipping">
        <div className="box">
          <h3>Billed To</h3>
          <p><strong>{data.billingName}</strong></p>
          <p>{data.billingAddress}</p>
          <p>Phone: {data.billingPhone}</p>
        </div>

        {data.shippingName && data.shippingAddress && data.shippingPhone && (
          <div className="box">
            <h3>Shipped To</h3>
            <p><strong>{data.shippingName}</strong></p>
            <p>{data.shippingAddress}</p>
            <p>Phone: {data.shippingPhone}</p>
          </div>
        )}
      </section>

      {/* Items Table */}
      <section className="items-section">
        <table className="items">
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
            {(data.items || []).map((item, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.qty}</td>
                <td>Rs {Number(item.amount).toFixed(2)}</td>
                <td>Rs {(item.qty * item.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Totals */}
      <section className="totals">
        <div className="totals-box">
          <p className='final-subtotal'><strong>Subtotal:</strong> Rs {Number(data.subTotal).toFixed(2)}</p>
          {data.tax > 0 && (
            <p className='final-tax'><strong>Tax ({data.tax}%):</strong> Rs {Number(data.taxAmount).toFixed(2)}</p>
          )}
          <p className="final-total"><strong>Total:</strong> Rs {Number(data.total).toFixed(2)}</p>
        </div>
      </section>

      {/* Bank Details */}
      {(data.accountName || data.accountNumber || data.accountIfscCode) && (
        <section className="bank-details">
          <h3>Bank Account Details</h3>
          {data.accountName && <p><strong>Account Holder:</strong> {data.accountName}</p>}
          {data.accountNumber && <p><strong>Account Number:</strong> {data.accountNumber}</p>}
          {data.accountIfscCode && <p><strong>IFSC Code:</strong> {data.accountIfscCode}</p>}
        </section>
      )}

      {/* Notes */}
      {data.notes && (
        <section className="notes">
          <h3>Remarks</h3>
          <p>{data.notes}</p>
        </section>
      )}
    </div>
  );
};
