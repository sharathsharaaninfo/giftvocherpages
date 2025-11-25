
import React, { useState , useEffect } from 'react';
import bannerImage from "../images/banner.jpg";
import mobileBannerImage from '../images/mobilebanner.jpg';
import '../components/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logoImage from "../images/logo2.jpg"


function OtpModal({  isOpen, onClose, onVerify, onResend, mobile, setOtpModalOpen,setIsOtpVerified}) {

  const [otp, setOtp] = useState(''); 
  const [otpError,setOtpError] = useState('')
  const [otpSent, setOtpSent] = useState(false);


  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleVerify = async (otp) => {

    if (otp.trim() === '') {
      setOtpError('OTP is required');
      return;
    }
    setOtpError('');
    try {
    const verificationUrl =`https://bgapis.bhimagold.com/api_db.js/api/Validateotp/${mobile}/${otp}`;
    console.log(verificationUrl);
      const response = await fetch(verificationUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      const responseData = await response.json();
      console.log(responseData);
  
      if (response.ok) {
        console.log('OTP verification successful');
        setIsOtpVerified(true);
        setOtpModalOpen(false); 
       
      } else {
        console.log('Invalid OTP');
        setOtpError('Invalid OTP. Please try again.');
        
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };
  const handleResend = async () => {
    try {
     
      const apiUrl = `https://bgapis.bhimagold.com/api_db.js/api/Sendotp/${mobile}`;
  
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
      },
    });
  
    const responseData = await response.json();
    console.log(responseData)
    if (response.ok) {
      console.log('OTP resent successfully');
      setOtpSent(true); 
      setOtpError(''); 
      setOtp('');
    } else {
      console.log('Failed to resend OTP');
    }
  } catch (error) {
    console.error('Error resending OTP:', error);
  }
  };
  
  

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enter OTP</h5>
            <button type="button" className="close" style={{color:"red"}} onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="otpInput"></label>
              <input
                type="text"
                className="form-control"
                id="otpInput"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                style={{borderColor:"black",border:""}}
                onKeyPress={(e) => {
                  const onlyDigits = /^\d+$/;
                  if (!onlyDigits.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
               {otpError && <div className="text-danger">{otpError}</div>}
            </div>
          </div>
          <div className="modal-footer">
          <button type="button" 
          className="btn"
          style={{
            margin:"auto",
            color:"white",
            backgroundColor:"#7f2b0a",
            verticalAlign: "middle",
          }} 
           onClick={() => handleVerify(otp)}>Verify</button>
            
            <button type="button" className="btn btn-info" hidden={true}  onClick={handleResend}>Resend OTP</button>
          </div>
        </div>
      </div>
    </div>
  );
}


function App() {
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [voucherDetails, setVoucherDetails] = useState(null);
  const [isOtpverified,setIsOtpVerified] = useState(false)
  const [ isCouponClaimed,setIsCouponClaimed] = useState(false);
  const [isClaimButtonClicked, setIsClaimButtonClicked] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState('');
  
  useEffect(() => {
    fetch('/terms.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => setTermsAndConditions(data))
  .catch(error => console.error('Error fetching terms:', error));
  })
   
  


  const handleMobileChange = (event) => {
    setMobile(event.target.value);

    setMobileError('');
  };


  const handleSend = async () => {
    if (mobile.trim() === '') {
      setMobileError('Mobile number is required');
      return;
    }
    try {
      
      const apiUrl = `https://bgapis.bhimagold.com/api_db.js/api/Sendotp/${mobile}`;
    
      const response = await fetch(apiUrl, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        setOtpSent(true);
        setOtpModalOpen(true);
        console.log('OTP sent successfully');
    } else {
      console.log('Failed to send OTP');
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

const claimCoupon = async () => {
  try {
    setIsClaimButtonClicked(true);
    const claimRequestBody = {
      VoucherCode: 'Bhima',
      CustomerName: 'Bhima Jewellers',
      MobileNo: mobile,
    };
   // const allOriginsUrl = 'https://api.allorigins.win/raw?url=';
    const apiUrl = 'http://giftcardwebapis.bhimagold.com/api_db.js/api/bhima/akvouchercode';
    //const fullApiUrl = allOriginsUrl + encodeURIComponent(apiUrl);
    
    
  
    console.log('Claim URL:', apiUrl);
    console.log('Request Body:', claimRequestBody);
    
  const claimResponse = await fetch(apiUrl, {
   
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(claimRequestBody),
   
  });
  
  const claimResponseData = await claimResponse.json();
  console.log('Claim Response Status:', claimResponse.status);
  console.log('Claim Response Data:', claimResponseData);
  
    console.log(claimResponseData);

    if (claimResponse.ok) {
      console.log('Gift coupon claimed successfully');
      setVoucherDetails({
        CardNumber: claimResponseData.CardNumber,
        CardPIN: claimResponseData.CardPIN,
        ResponseMessage: claimResponseData.ResponseMessage
      });
      setIsCouponClaimed(true);
    } else {
      console.log('Failed to claim gift coupon');
    }
  } catch (error) {
    console.error('Error claiming gift coupon:', error);
  }
};
  
  // const handleVerify = async (otp) => {
  //   try {
  //   const verificationUrl =`https://bgapis.bhimagold.com/api_db.js/api/Validateotp/${mobile}/${otp}`;
  //   console.log(verificationUrl);
  //     const response = await fetch(verificationUrl, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
      
  //     const responseData = await response.json();
  //     console.log(responseData);
  
  //     if (response.ok) {
  //       console.log('OTP verification successful');
  //       setOtpModalOpen(false); 
  //       setIsOtpVerified(true);
        
  //     } else {
  //       console.log('Invalid OTP');
        
  //     }
  //   } catch (error) {
  //     console.error('Error verifying OTP:', error);
  //   }
  // };
  

  const handleVerify = () =>{
    console.log('otp');
    
  }
  
  const handleResend = () => {
    
    if (otpSent) {
      console.log('Resending OTP');
      
    
    }
  };
  

  return (
    <div className="page-content">
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
        <div className="header">
        <img src={logoImage} alt="Logo" className="logo img-fluid" />
      </div>
      <div className="banner-container" >
    <img src={bannerImage} alt="Background" className="desktop-banner img-fluid" />
    <img src={mobileBannerImage} alt="Mobile Background" className="mobile-banner img-fluid" />
  </div>
        </div>
      </div>
      
 
      
  <div className="row mobile-steps"  >
      <div className="col-lg-6 mobile-steps">
        <div className="card-body mobile-steps">
         
          <div dangerouslySetInnerHTML={{ __html: termsAndConditions }} />
        </div>
      </div>
   
      
  <div className='col-lg-6' style={{marginTop:"170px"}} >
  <div class="card textbox" style={{borderColor:"black",height:"300px" ,marginBottom:"80px"}} padding="15px">
  <div class="card-body">
  <div class="form-group">
  <label htmlFor="exampleFormControlInput1" style={{color:"black"}}></label>
  <input
  type="text"
  className="form-control"
  placeholder="Please enter your 10 digit mobile number"
 
  value={mobile}
  onChange={handleMobileChange}
 disabled={isOtpverified}
  onKeyPress={(e) => {
    const onlyDigits = /^\d+$/;
    if (!onlyDigits.test(e.key)) {
      e.preventDefault();
    }
  }}
  style={{
    margin:"auto",
    marginTop:"1px",
    fontFamily:"baskerville!important",
    
  }}
/>


  {mobileError && <div className="text-danger">{mobileError}</div>}
</div>
<br></br>
 
  {/* <button onClick={handleSend}  className="btn btn-success" >Send OTP</button> */}
  {isOtpverified ? (
        <>
          {/* <p>Please click the button below to claim your gift voucher</p> */}
          <button
            onClick={claimCoupon}
            
            className="btn"
            style={{
              display: isClaimButtonClicked ? 'none' : 'block',
              color:"white",
              margin:"auto",
              marginTop:"60px",
              backgroundColor:"#7f2b0a",
              justifyItems: "center",
              letterSpacing:".5px",
              boxShadow:"none"
              
            }}
          >
            Claim Your Gift Voucher Now!
          </button>
        </>
      ) : (
        <button
          onClick={handleSend}
          style={{
            display:"block",
            margin:"auto",
            marginTop:"60px",
            color:"white",
            backgroundColor:"#7f2b0a",
            letterSpacing:".5px",
            boxShadow:"none",
            left:".5px",
           

            
          }}
          className="btn"
          
        >
          Send OTP to Your Mobile Number
        </button>
      )}
  </div>
  {voucherDetails && (
          <div className="voucher-details">
            {voucherDetails.CardNumber && voucherDetails.CardPIN ? (
              <>
                <p><span>Your Gift voucher</span></p>
                <p className={voucherDetails.CardNumber && voucherDetails.CardPIN ? 'green-text' : 'red-text'}>
                 CardNumber: {voucherDetails.CardNumber}
                  </p>
              <p className={voucherDetails.CardNumber && voucherDetails.CardPIN ? 'green-text' : 'red-text'}>
              Pin: {voucherDetails.CardPIN}
              </p>
              </>
            ) : (
              <p style={{color:"#D10000",fontFamily:"revert-layer",fontWeight:"bold",textAlign:"center",marginBottom:"40px"}}>{voucherDetails.ResponseMessage}</p>
            )}
          <p>
           {voucherDetails.CardNumber && voucherDetails.CardPIN
           ? <span>
            Valid Till next one month. Copy of the coupon code has been sent to your mobile number.
           </span>
           : ''}
           </p>
          </div>
        )}

  {otpModalOpen && (
            <OtpModal
              isOpen={otpModalOpen}
              onClose={() => setOtpModalOpen(false)}
              onVerify={handleVerify} 
              onResend={handleResend}
              mobile={mobile}
              setOtpModalOpen={setOtpModalOpen}
              setIsOtpVerified={setIsOtpVerified} 

            />
          )}
        </div>
      </div>
      </div>
      </div>
    </div>
   
  );
}

export default App;
