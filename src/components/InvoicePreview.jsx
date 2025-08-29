import React, { forwardRef } from 'react'
import { formatInvoiceData } from '../util/formatInvoiceData';
import { Template1 } from '../templates/Template1/Template1';
import { templateComponent } from '../util/invoiceTemplates';

const InvoicePreview = forwardRef(({invoiceData,template},ref) => {
const formattedData= formatInvoiceData(invoiceData);
const SelectedTemplate= templateComponent[template] || templateComponent["template1"];
  return (
    <div ref={ref} className='invoice-preview container px-2 py-2 overflow-auto'>
  <SelectedTemplate data={formattedData}/>
    </div>
  )
});

export default InvoicePreview;