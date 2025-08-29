import React from 'react';
import './Template4.css';

export const Template4 = ({ data }) => {
  return (
    <div className="template4">
      {/* Header */}
      <div className="header">
        <div>
          {data.companyLogo && <img src={data.companyLogo} alt="logo" className="logo" />}
          <h2>{data.companyName}</h2>
          <p>{data.companyAddress}</p>
          <p>Phone: {data.companyPhone}</p>
        </div>
        <div className="invoice-box">
          <h1>{data.title}</h1>
          <p><strong>Invoice No:</strong> {data.invoiceNumber}</p>
          <p><strong>Invoice Date:</strong> {data.invoiceDate}</p>
          <p><strong>Due Date:</strong> {data.paymentDate}</p>
        </div>
      </div>

      {/* Billing Info */}
      <div className="details">
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
      </div>

      {/* Items Table */}
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
          {data.items.map((item, i) => (
            <tr key={i}>

              <td>{i+1}</td>
              <td>{item.name}</td>
                  <td>{item.description}</td>
              <td>{item.qty}</td>
              <td>Rs {Number(item.amount).toFixed(2)}</td>
              <td>Rs {(item.qty * item.amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
     <div className="summary">
        <p><strong>Subtotal:</strong> Rs {data.subTotal}</p>
        {data.tax > 0 && (
          <p><strong>Tax ({data.tax}%):</strong> Rs {data.taxAmount}</p>
        )}
        <p className="total"><strong>Total:</strong> Rs {data.total}</p>
      </div>

      {/* Bank Info */}
      {(data.accountName || data.accountNumber || data.accountIfscCode) && (
        <div className="bank">
          <h3>Bank Info</h3>
          <p><strong>Account Holder:</strong> {data.accountName}</p>
          <p><strong>Account Number:</strong> {data.accountNumber}</p>
          <p><strong>IFSC:</strong> {data.accountIfscCode}</p>
        </div>
      )}

      {/* Notes */}
      {data.notes && (
        <div className="notes">
          <h3>Notes</h3>
          <p>{data.notes}</p>
        </div>
      )}
    </div>
  );
};
