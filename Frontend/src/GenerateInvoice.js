import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import InvoiceTemplate from './InvoiceTemplate';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
const GenerateInvoice = (props) => {
  const printDocument = () => {
    const input = document.getElementById('invoice-modal');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for A4 size

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate the aspect ratio and scale the image accordingly
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const aspectRatio = canvasWidth / canvasHeight;

      let imgWidth = pdfWidth;
      let imgHeight = pdfWidth / aspectRatio;

      if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = pdfHeight * aspectRatio;
      }

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('invoice.pdf');
    });
  };

  const [modalBox, setModalBox] = useState(false);
  useEffect(() => {
    setModalBox(true)
  }, [])
console.log(props)
  return (
    <div >
      <Modal  onHide={setModalBox} show={modalBox} size="xl" backdrop="static"
        keyboard={false} >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel"> Invoice</h5>
            <button type="button" className="btn-close" onClick={() => setModalBox(false)}></button>
          </div>
          <div id='invoice-modal'  className="modal-body">
            <InvoiceTemplate {...props} />
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <div className="">
              <button className="btn btn-info btn-xs" onClick={printDocument}>Generate PDF</button>
            </div>
            <div className="">
              <button type="button" className="btn btn-danger btn-xs me-3" onClick={() => setModalBox(false)}>Close</button>             
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GenerateInvoice;
