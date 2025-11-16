import React from 'react';

const InvoiceTemplate = ({
  sellerDetails,
  placeOfSupply,
  billingDetails,
  shippingDetails,
  placeOfDelivery,
  orderDetails,
  invoiceDetails,
  reverseCharge,
  items,
  totalAmountInWords,
  signatureImage,
  companyLogo,
}) => {
  const calculateNetAmount = (item) => {
    return item.unitPrice * item.quantity - item.discount;
  };

  const calculateTaxAmount = (netAmount, taxRate) => {
    return netAmount * (taxRate / 100);
  };

  const isSameState = placeOfSupply === placeOfDelivery;
  let grandTotal = 0;
  let taxGrandTotal = 0;

  return (
    <div className='' id="invoice-template " style={{ padding: '20px', maxWidth: '800px', margin: 'auto', border: '1px solid #ccc' }}>
      {/* <div style={{ textAlign: 'center' }}>
        <h1>Invoice</h1>
      </div> */}
      <div className="d-flex justify-content-between">
        <div className="col-6">
          <div style={{ marginBottom: '20px', textAlign: 'start' }}>
            {companyLogo && <img src={URL.createObjectURL(companyLogo)} alt="Company Logo" style={{ height: "100px", width: "300px" }} />}
          </div>
          <div>
            <p className='fs-7 mb-0 ' style={{ fontWeight: "650" }}>Sold By:</p>
            <p className='mb-0 '>{sellerDetails.name}</p>
            <p className='mb-0 '>{sellerDetails.address}</p>
            <p className='mb-5'>{`${sellerDetails.city}, ${sellerDetails.state} - ${sellerDetails.pincode}`}</p>
            <p className='fs-7 mb-0 ' style={{ fontWeight: "640" }}>PAN No: {sellerDetails.panNo}</p>
            <p className='fs-7 mb-5 ' style={{ fontWeight: "650" }}>GST Registration No: {sellerDetails.gstRegistrationNo}</p>
          </div>
          <div className='mb-5'>
            <p className='fs-7 mb-0' style={{ fontWeight: "650" }}>Order Details:</p>
            <p className='mb-0 '>Order No: {orderDetails.orderNo}</p>
            <p className='mb-3'>Order Date: {orderDetails.orderDate}</p>
          </div>
          {/* <div>
            <p className='fs-7' style={{ fontWeight: "650" }}>Invoice Details:</p>
            <p>Invoice No: {invoiceDetails.invoiceNo}</p>
            <p>Invoice Date: {invoiceDetails.invoiceDate}</p>
            <p>Invoice Details: {invoiceDetails.invoiceDetails}</p>
          </div> */}

        </div>

        <div className="col-6">
          <div >
            <h5 className='m-0' style={{ fontWeight: "700" }}>Tax Invoice /Bill of Support/Cash Memo</h5>
            <h7>(Original for Recipent)</h7>
            <p>{placeOfSupply}</p>
          </div>
          <div className='mt-4 pt-5 text-end'>
            <p className='fs-7 mb-0' style={{ fontWeight: "650" }}>Billing Address:</p>
            <p className=' mb-0'>{billingDetails.name}</p>
            <p className=' mb-0'>{billingDetails.address}</p>
            <p className=' mb-2'>{`${billingDetails.city}, ${billingDetails.state} - ${billingDetails.pincode}`}</p>
            <p className='fs-7 mb-0' style={{ fontWeight: "600" }}>State/UT Code: {billingDetails.stateCode}</p>
          </div>
          <div className='mt-2 pt-5 text-end'>
            <p className='fs-7  mb-0' style={{ fontWeight: "650" }}>Shipping Address:</p>
            <p className=' mb-0'>{shippingDetails.name}</p>
            <p className=' mb-0'>{shippingDetails.address}</p>
            <p className=' mb-0'>{`${shippingDetails.city}, ${shippingDetails.state} - ${shippingDetails.pincode}`}</p>
            <p className='fs-7 mb-0' style={{ fontWeight: "600" }}>State/UT Code: {shippingDetails.stateCode}</p>
          </div>
          <div className=' text-end'>
            <p className='fs-7 mb-0' style={{ fontWeight: "650" }}>Place of Delivery: <span className='fs-9' style={{ fontWeight: "500" }}>{placeOfDelivery || 'place '}</span></p>
            <p className='fs-7' style={{ fontWeight: "650" }}>Place of Supply: <span className='fs-9' style={{ fontWeight: "500" }}>{placeOfDelivery || 'place '}</span></p>
          </div>
        </div>
      </div>


      <table className='teble table-bordered text-center' style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Description</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Tax Amount</th>
            <th>Net Amount</th>
            <th>Tax Rate</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>IGST</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, index) => {
            const netAmount = calculateNetAmount(item);
            const taxRate = item.taxRate;
            const taxAmount = calculateTaxAmount(netAmount, taxRate);
            const cgst = isSameState ? taxAmount / 2 : 0;
            const sgst = isSameState ? taxAmount / 2 : 0;
            const igst = isSameState ? 0 : taxAmount;
            const totalAmount = netAmount + taxAmount;
            grandTotal += totalAmount;
            taxGrandTotal += taxAmount;

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.description}</td>
                <td>{item.unitPrice}</td>
                <td>{item.quantity}</td>
                <td>{netAmount}</td>
                <td>{taxRate}%</td>
                <td>{cgst}</td>
                <td>{sgst}</td>
                <td>{igst}</td>
                <td>{taxAmount}</td>
                <td>{totalAmount}</td>
              </tr>
            );
          })}
          <tr className='border-1'>
            <td className='text-start fs-7 mb-0' style={{ fontWeight: "640" }} colSpan={9}>Total:</td>
            <td>{taxGrandTotal}</td>
            <td>{grandTotal}</td>
          </tr>
          <tr className='border-1 text-start ps-3'>
            <td colSpan={12}>
              <p className='text-start fs-5 mb-0' style={{ fontWeight: "640" }}>Amount in Words:</p>
              <p className='text-start fs-5 mb-0' style={{ fontWeight: "640" }}>{totalAmountInWords}</p>
            </td>
          </tr>
          <tr className='text-end' style={{ fontWeight: "640" }}>
            <td colSpan={12}>
              <p>For {sellerDetails.name}:</p>
              <img src={URL.createObjectURL(signatureImage)} alt="Signature" style={{ maxWidth: '200px', minWidth: '200px', maxHeight: '50px' }} />
              <p>Authorised Signatory</p>
            </td>           
          </tr>
        </tbody>
      </table>
      <p className='text-start fs-5 mb-0 pt-0 mt-0' style={{ fontWeight: "640" }}>Whether tax is payable under reverse chanrge- {reverseCharge}</p>
     

     
      {/* <div className='text-end' style={{ fontWeight: "640" }}>
        <p>For {sellerDetails.name}:</p>
        <img src={URL.createObjectURL(signatureImage)} alt="Signature" style={{ maxWidth: '200px', minWidth:'200px', maxHeight:'50px' }} />
        <p>Authorised Signatory</p>
      </div> */}
    </div>
  );
};

export default InvoiceTemplate;
