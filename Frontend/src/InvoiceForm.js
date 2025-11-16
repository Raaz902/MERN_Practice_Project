import React, { useState } from 'react';
import './InvoiceForm.css'; // Import the CSS file

import Select from 'react-select';
import { toast } from 'react-toastify';

const InvoiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    sellerDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      panNo: '',
      gstRegistrationNo: '',
    },
    placeOfSupply: '',
    billingDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: '',
    },
    shippingDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: '',
    },
    placeOfDelivery: '',
    orderDetails: {
      orderNo: '',
      orderDate: '',
    },
    invoiceDetails: {
      invoiceNo: '',
      invoiceDetails: '',
      invoiceDate: '',
    },
    reverseCharge: 'No',
    items: [
      {
        description: '',
        unitPrice: 0,
        quantity: 1,
        discount: 0,
        taxRate: 18,
      },
    ],
    signatureImage: '',
    companyLogo: '',
    totalAmountInWords: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const [section, field, index] = name.split('.');

    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else if (index !== undefined) {
      setFormData((prevData) => {
        const items = [...prevData.items];
        items[parseInt(index)][field] = value;
        return { ...prevData, items };
      });
    } else if (section) {
      setFormData((prevData) => ({
        ...prevData,
        [section]: { ...prevData[section], [field]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const addItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        { description: '', unitPrice: 0, quantity: 1, discount: 0, taxRate: 18 },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.sellerDetails.name) {
      toast.error("Please fill all the Fields")
      return
    }
    onSubmit(formData);
  };

  console.log(formData)

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Seller Details</h2>
        <input
          type="text"
          name="sellerDetails.name"
          placeholder="Name"
          value={formData.sellerDetails.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sellerDetails.address"
          placeholder="Address"
          value={formData.sellerDetails.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sellerDetails.city"
          placeholder="City"
          value={formData.sellerDetails.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sellerDetails.state"
          placeholder="State"
          value={formData.sellerDetails.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sellerDetails.pincode"
          placeholder="Pincode"
          value={formData.sellerDetails.pincode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sellerDetails.panNo"
          placeholder="PAN No."
          value={formData.sellerDetails.panNo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sellerDetails.gstRegistrationNo"
          placeholder="GST Registration No."
          value={formData.sellerDetails.gstRegistrationNo}
          onChange={handleChange}
        />

        <h2>Company Logo</h2>
        <input
          type="file"
          name="companyLogo"
          onChange={handleChange}
        />

        <h2>Place of Supply</h2>
        <input
          type="text"
          name="placeOfSupply"
          placeholder="Place of Supply"
          value={formData.placeOfSupply}
          onChange={(e) => setFormData((preData) => ({ ...preData, placeOfSupply: e.target.value }))}

        />

        <h2>Billing Details</h2>
        <input
          type="text"
          name="billingDetails.name"
          placeholder="Name"
          value={formData.billingDetails.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="billingDetails.address"
          placeholder="Address"
          value={formData.billingDetails.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="billingDetails.city"
          placeholder="City"
          value={formData.billingDetails.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="billingDetails.state"
          placeholder="State"
          value={formData.billingDetails.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="billingDetails.pincode"
          placeholder="Pincode"
          value={formData.billingDetails.pincode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="billingDetails.stateCode"
          placeholder="State/UT Code"
          value={formData.billingDetails.stateCode}
          onChange={handleChange}
        />

        <h2>Shipping Details</h2>
        <input
          type="text"
          name="shippingDetails.name"
          placeholder="Name"
          value={formData.shippingDetails.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="shippingDetails.address"
          placeholder="Address"
          value={formData.shippingDetails.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="shippingDetails.city"
          placeholder="City"
          value={formData.shippingDetails.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="shippingDetails.state"
          placeholder="State"
          value={formData.shippingDetails.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="shippingDetails.pincode"
          placeholder="Pincode"
          value={formData.shippingDetails.pincode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="shippingDetails.stateCode"
          placeholder="State/UT Code"
          value={formData.shippingDetails.stateCode}
          onChange={handleChange}
        />

        <h2>Place of Delivery</h2>
        <input
          type="text"
          name="placeOfDelivery"
          placeholder="Place of Delivery"
          value={formData.placeOfDelivery}
          onChange={(e) => setFormData((preData) => ({ ...preData, placeOfDelivery: e.target.value }))}
        />

        <h2>Order Details</h2>
        <input
          type="text"
          name="orderDetails.orderNo"
          placeholder="Order No."
          value={formData.orderDetails.orderNo}
          onChange={handleChange}
        />
        <input
          type="date"
          name="orderDetails.orderDate"
          placeholder="Order Date"
          value={formData.orderDetails.orderDate}
          onChange={handleChange}
        />

        <h2>Invoice Details</h2>
        <input
          type="text"
          name="invoiceDetails.invoiceNo"
          placeholder="Invoice No."
          value={formData.invoiceDetails.invoiceNo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="invoiceDetails.invoiceDetails"
          placeholder="Invoice Details"
          value={formData.invoiceDetails.invoiceDetails}
          onChange={handleChange}
        />
        <input
          type="date"
          name="invoiceDetails.invoiceDate"
          placeholder="Invoice Date"
          value={formData.invoiceDetails.invoiceDate}
          onChange={handleChange}
        />

        <h2>Reverse Charge</h2>
        <Select
          value={{ value: formData.reverseCharge, label: formData.reverseCharge }}
          onChange={(selectedOption) => setFormData((preData) => ({ ...preData, reverseCharge: selectedOption.value }))}
          options={['YES', 'NO']?.map((item) => ({ value: item, label: item }))}
          styles={{
            control: (provided) => ({
              ...provided,
              width: '100%',
              backgroundColor: 'transparent',
              borderColor: '#17a2b8',
            })
          }}
        />

        {/* <select
          name="reverseCharge"
          value={formData.reverseCharge}
          onChange={(e)=>console.log(e.target)}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select> */}

        <h2>Items</h2>
        {formData.items.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              name={`items.description.${index}`}
              placeholder="Description"
              value={item.description}
              onChange={handleChange}
            />
            <input
              type="number"
              name={`items.unitPrice.${index}`}
              placeholder="Unit Price"
              value={item.unitPrice}
              onChange={handleChange}
            />
            <input
              type="number"
              name={`items.quantity.${index}`}
              placeholder="Quantity"
              value={item.quantity}
              onChange={handleChange}
            />
            <input
              type="number"
              name={`items.discount.${index}`}
              placeholder="Discount"
              value={item.discount}
              onChange={handleChange}
            />
            <input
              type="number"
              name={`items.taxRate.${index}`}
              placeholder="Tax Rate"
              value={item.taxRate}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="button" onClick={addItem}>
          Add Item
        </button>

        <h2>Signature Image</h2>
        <input
          type="file"
          name="signatureImage"
          onChange={handleChange}
        />

        <h2>Total Amount in Words</h2>
        <input
          type="text"
          name="totalAmountInWords"
          placeholder="Total Amount in Words"
          value={formData.totalAmountInWords}
          onChange={(e) => setFormData((preData) => ({ ...preData, totalAmountInWords: e.target.value }))}
        />

        <button type="submit">Generate Invoice</button>
      </form>
    </div>
  );
};

export default InvoiceForm;
