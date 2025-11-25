// VoucherDetailsModal.js
import React from 'react';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function VoucherDetailsModal({ isOpen, onClose, voucherDetails, copySuccess, onCopyClick }) {
  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Your Gift Coupon</h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            {voucherDetails && voucherDetails.code && (
              <div>
                
                <p style={{ color: 'maroon', fontWeight: 'bold' }}>
                  Code: {voucherDetails.code}
                  {/* Place IconButton directly next to the code */}
                  <IconButton onClick={onCopyClick} size="small" color="primary" style={{ padding: '0', marginLeft: '10px' }}>
                    <ContentCopyIcon />
                  </IconButton>
                  
                </p>
                <button style={{
        color: "white",
        backgroundColor: "#7f2b0a",
       
        marginBottom:"2px",
       marginLeft:"30%"
     
        
      }}>
        <a href="https://www.bhimagold.com/jewellery/exclusive-offer" className="btn" style={{color:'white'}}
          >Continue Shopping</a>
          
      </button>
                {copySuccess && <p style={{ color: 'green' }}>{copySuccess}</p>}
                
              </div>
            )}
            {voucherDetails && !voucherDetails.code && (
              <p className="red-text">{voucherDetails.message}</p>
            
            )}
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoucherDetailsModal;
