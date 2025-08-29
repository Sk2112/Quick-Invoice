import React from 'react';
import './Template5.css';

export const Template5 = ({ data }) => {
  return (
    <div className="template5">
      <div className="header">
        <div>
          {data.companyLogo && <img src={data.companyLogo} alt="Logo" className="logo" />}
          <h2>{data.companyName}</h2>
          <p>{data.companyAddress}</p>
          <p>Phone: {data.companyPhone}</p>
        </div>
        <div className="right">
          <h1>{data.title}</h1>
          <p>Invoice Number: {data.invoiceNumber}</p>
          <p>Invoice Date: {data.invoiceDate}</p>
          <p>Due Date: {data.paymentDate}</p>
        </div>
      </div>

      <div className="billing">
        <div>
          <h3>Billed To</h3>
          <p>{data.billingName}</p>
          <p>{data.billingAddress}</p>
          <p>Phone: {data.billingPhone}</p>
        </div>
        {data.shippingName && (
          <div>
            <h3>Shipped To</h3>
            <p>{data.shippingName}</p>
            <p>{data.shippingAddress}</p>
            <p>Phone: {data.shippingPhone}</p>
          </div>
        )}
      </div>

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
              <td>Rs {item.amount}</td>
              <td>Rs {(item.qty * item.amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="summary">
        <p><strong>Subtotal:</strong> Rs {data.subTotal}</p>
        {data.tax > 0 && (
          <p><strong>Tax ({data.tax}%):</strong> Rs {data.taxAmount}</p>
        )}
        <p className="total"><strong>Total:</strong> Rs {data.total}</p>
      </div>

      {(data.accountName || data.accountNumber || data.accountIfscCode) && (
        <div className="bank">
          <h3>Bank Details</h3>
          <p><strong>Holder:</strong> {data.accountName}</p>
          <p><strong>Number:</strong> {data.accountNumber}</p>
          <p><strong>IFSC:</strong> {data.accountIfscCode}</p>
        </div>
      )}

      {data.notes && (
        <div className="notes">
          <h3>Remarks</h3>
          <p>{data.notes}</p>
        </div>
      )}
    </div>
  );
};
