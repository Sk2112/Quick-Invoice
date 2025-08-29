import axios from "axios";

// Save Invoice
export const saveInvoice = (baseUrl, payload, token) => {
  return axios.post(`${baseUrl}/invoices`, payload, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
};

// Get All Invoices
export const getAllInvoices = (baseUrl, token) => {
  return axios.get(`${baseUrl}/invoices`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Delete Invoice
export const deleteInvoices = (baseUrl, id, token) => {
  return axios.delete(`${baseUrl}/invoices/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Send Invoice via Email
export const sendInvoices = (baseUrl, formData, token) => {
  return axios.post(`${baseUrl}/invoices/sendinvoice`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
