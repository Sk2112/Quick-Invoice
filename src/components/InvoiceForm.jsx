import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { Trash2 } from "lucide-react";
import { AppContext } from "../context/AppContext";

function InvoiceForm() {
  const { invoiceData, setInvoiceData } = useContext(AppContext);
  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          name: "",
          qty: "",
          amount: "",
          description: "",
          total: 0,
        },
      ],
    }));
  };

  const deleteItem = (index) => {
    const items = invoiceData.items.filter((_, i) => i != index);
    setInvoiceData((prev) => ({ ...prev, items }));
  };
  const handleChange = (section, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSameAsBilling = () => {
    setInvoiceData((prev) => ({
      ...prev,
      shipping: { ...prev.billing },
    }));
  };

  const handleItemChange = (index, field, value) => {
    const items = [...invoiceData.items];
    items[index][field] = value;
    if (field === "qty" || field === "amount") {
      items[index].total = (items[index].qty || 0) * (items[index].amount || 0);
    }
    setInvoiceData((prev) => ({ ...prev, items }));
  };

  const calculateTotal = () => {
    const subTotal = invoiceData.items.reduce(
      (sum, item) => sum + (item.total || 0),
      0
    );
    const taxRate = Number(invoiceData.tax || 0);
    const taxAmount = (subTotal * taxRate) / 100;
    const grandTotal = subTotal + taxAmount;
    return {
      subTotal,
      taxAmount,
      grandTotal,
    };
  };

  const { subTotal, taxAmount, grandTotal } = calculateTotal();
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData((prev) => ({
          ...prev,
          logo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };



  // const handleSubmmit=()=>{
  //   console.log(invoiceData);
  // }

  useEffect(() => {
    if (!invoiceData.invoice.number) {
      const randomNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
      setInvoiceData((prev) => ({
        ...prev,
        invoice: { ...prev.invoice, number: randomNumber },
      }));
    }
  }, []);

  return (
    <div className="invoiceform container py-4">
      {/* Company Logo */}
      <div className="mb-4">
        <h5> Company Logo</h5>
        <div className="d-flex align-items-center gap-3 ">
          <label htmlFor="image" className="form-label ">
            <img
              src={invoiceData.logo ? invoiceData.logo : assets.uploodArea}
              alt="upload"
              width={48}
              className=" cursor-pointer"
            />
            <input
              type="file"
              name="logo"
              id="image"
              hidden
              className="form-control "
              accept="image/*"
              onChange={handleLogoUpload}
            />
          </label>
        </div>
      </div>
      {/* Company Info */}
      <div className="mb-4">
        <h5>Your Company</h5>
        <div className="row gap-4">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Company Name"
              onChange={(e) => handleChange("company", "name", e.target.value)}
              value={invoiceData.company.name}
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Company Phone Number"
              onChange={(e) => handleChange("company", "phone", e.target.value)}
              value={invoiceData.company.phone}
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Company Address"
              onChange={(e) =>
                handleChange("company", "address", e.target.value)
              }
              value={invoiceData.company.address}
            />
          </div>
        </div>
      </div>

      {/* Bill to  */}
      <div className="mb-4">
        <h5>Bill To</h5>
        <div className="row gap-4">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder=" Name"
              onChange={(e) => handleChange("billing", "name", e.target.value)}
              value={invoiceData.billing.name}
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              onChange={(e) => handleChange("billing", "phone", e.target.value)}
              value={invoiceData.billing.phone}
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              onChange={(e) =>
                handleChange("billing", "address", e.target.value)
              }
              value={invoiceData.billing.address}
            />
          </div>
        </div>
      </div>

      {/* ship   to  */}
      <div className="mb-4 ">
        <div className="d-flex justify-content-between align-itmes-center mb-2 ">
          <h5>Ship to </h5>
          <div className="form-check ">
            <input
              type="checkbox"
              className="form-check-input"
              id="sameAsBilling"
              onChange={handleSameAsBilling}
              value={invoiceData.shipping.name}
            />
            <label htmlFor="sameAsBilling" className="form-check-label">
              Same as Billing
            </label>
          </div>
        </div>

        {/* Ship to  */}
        <div className="row gap-4">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Name "
              onChange={(e) => handleChange("shipping", "name", e.target.value)}
              value={invoiceData.shipping.name}
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              onChange={(e) =>
                handleChange("shipping", "phone", e.target.value)
              }
              value={invoiceData.shipping.phone}
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Shipping Address"
              onChange={(e) =>
                handleChange("shipping", "address", e.target.value)
              }
              value={invoiceData.shipping.address}
            />
          </div>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="mb-4">
        <h5>Invoice Information</h5>
        <div className="row gap-4">
          <div className="col-md-4">
            <label htmlFor="invoiceNumber" className="form-label">
              Invoice Number
            </label>
            <input
              type="text"
              disabled
              className="form-control"
              id="invoiceNumber"
              value={invoiceData.invoice.number}
              onChange={(e) =>
                handleChange("invoice", "number", e.target.value)
              }
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="invoiceDate" className="form-label">
              Invoice Date
            </label>
            <input
              type="date"
              className="form-control"
              id="invoiceDate"
              value={invoiceData.invoice.date}
              onChange={(e) => handleChange("invoice", "date", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="invoiceDueDate" className="form-label">
              Invoice Due Date
            </label>
            <input
              type="date"
              className="form-control"
              id="invoiceDueDate"
              value={invoiceData.invoice.dueDate}
              onChange={(e) =>
                handleChange("invoice", "dueDate", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Item details */}
      <div className="mb-4">
        <h5>Items Details</h5>
        {invoiceData.items.map((item, index) => (
          <div key={index} className="card p-3 mb-3">
            <div className="row g-3 mb-2">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  placeholder="Qty"
                  className="form-control"
                  value={item.qty}
                  onChange={(e) =>
                    handleItemChange(index, "qty", e.target.value)
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  placeholder="Amount"
                  className="form-control"
                  value={item.amount}
                  onChange={(e) =>
                    handleItemChange(index, "amount", e.target.value)
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Total"
                  className="form-control"
                  value={item.total}
                  disabled
                />
              </div>
            </div>

            <div className="d-flex gap-2">
              <textarea
                className="form-control"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
              />
              {invoiceData.items.length > 1 && (
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteItem(index)}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}

        <button className="btn btn-primary" type="button" onClick={addItem}>
          Add Item
        </button>
      </div>

      {/* bank acoount info  */}
      <div className="mb-4">
        <h5>Bank Acoount Details </h5>
        <div className="row ">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Account Holder Name"
              value={invoiceData.account.name}
              onChange={(e) => handleChange("account", "name", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Account Number"
              value={invoiceData.account.number}
              onChange={(e) =>
                handleChange("account", "number", e.target.value)
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Branch/IFSC code"
              value={invoiceData.account.ifsccode}
              onChange={(e) =>
                handleChange("account", "ifsccode", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Total  */}
      <div className="mb-4">
        <h5>Totals</h5>
        <div className="d-flex justify-content-end">
          <div className="w-100 w-md-50">
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>{subTotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between align-items-center my-2">
              <label htmlFor="taxInput" className="me-2">
                Tax Rate(%)
              </label>
              <input
                type="number"
                id="textInput"
                className="form-control w-50 text-end"
                placeholder="2%"
                onChange={(e) =>
                  setInvoiceData((prev) => ({ ...prev, tax: e.target.value }))
                }
                value={invoiceData.tax}
              />
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax Amount</span>
              <span>{taxAmount.toFixed(2)}</span>
            </div>
            <div className=" fw-bold mt-2 d-flex justify-content-between">
              <span>Grand Total</span>
              <span>{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes  */}
      <div className="mb-4">
        <h5>Notes :</h5>
        <div className="w-100">
          <textarea
            name="notes"
            className="form-control"
            rows={3}
            value={invoiceData.notes}
            onChange={(e) =>
              setInvoiceData((prev) => ({ ...prev, notes: e.target.value }))
            }
          ></textarea>
        </div>
      </div>

      {/* <button onClick={handleSubmmit}>Submit </button> */}
    </div>
  );
}

export default InvoiceForm;
