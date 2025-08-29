import React, { createContext, useState } from "react";

// Create context
export const AppContext = createContext(null);

// Initial invoice data
export const initialInvoiceData = {
  title: "New Invoice",
  billing: { name: "", phone: "", address: "" },
  shipping: { name: "", phone: "", address: "" },
  invoice: { number: "", date: "", dueDate: "" },
  account: { name: "", number: "", ifsccode: "" },
  company: { name: "", number: "", address: "" },
  tax: 0,
  notes: "",
  items: [
    { name: "", qty: "", amount: "", description: "", total: 0 },
  ],
  logo: ""
};

// Context provider
export const AppContextProvider = ({ children }) => {
  const [invoiceTitle, setInvoiceTitle] = useState(initialInvoiceData.title);
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
const baseUrl="http://localhost:8080/api";

  const contextValue = {
    invoiceTitle,
    setInvoiceTitle,
    invoiceData,
    setInvoiceData,
    selectedTemplate,
    setSelectedTemplate,
    initialInvoiceData,
    baseUrl,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
