export const formatInvoiceData=(invoiceData)=>{
    const {
        title,
        company={},
        invoice={},
        account={},
        billing={},
        shipping={},
        tax=0,
        notes="",
        items=[],
        logo=""
    }=invoiceData || {};

    const  currencySymbol="Rs"
    const  subTotal=items.reduce((acc,item)=>acc+(item.qty*item.amount),0);
    const taxAmount= subTotal*(tax/100);
    const total = subTotal+taxAmount;

    return{
        title,
        companyName:company.name,
        companyAddress:company.address,
        companyPhone:company.phone,
        companyLogo:logo,

      invoiceNumber:invoice.number,
      invoiceDate:invoice.date,
      paymentDate:invoice.dueDate,


      accountName:account.name,
      accountNumber:account.number,
      accountIfscCode:account.ifsccode,



      billingName:billing.name,
      billingAddress:billing.address,
      billingpPhone:billing.phone,


      shippingName:shipping.name,
      shippingAddress:shipping.address,
      shippingPhone:shipping.phone,

      currencySymbol,
      tax,
      items,
      notes,
      subTotal,
      taxAmount,
      total
    }
}


export const formatDate=(dateStr)=>{
  if(!dateStr) return "N/A";

  const  date = new Date(dateStr);
  date.toLocaleDateString("en-GB",{
 day:"2-digit",
  month:'short',
  year:"numeric"
  })
};