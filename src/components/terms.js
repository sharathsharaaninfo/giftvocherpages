
import React, { useState } from 'react';
import bannerImage from "../images/Web (2).jpg";
import mobileBannerImage from '../images/mobilebanner.jpg';
import '../components/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logoImage from "../images/bhimalogofinal.png"
import { getSendOtpUrl } from '../Utils/apiUrls';


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
      const verificationUrl = getValidateOtpUrl(mobile, otp); // API to validate OTP
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
      const apiUrl = getSendOtpUrl(mobile); // API to send OTP

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
      
      const apiUrl = getSendOtpUrl(mobile); // API to send OTP
    
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
  //   const verificationUrl =getvalidationUrl(mobile, otp); // api to validate OTP
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
      
 
      
      <div className="row" >
        <div className="col-md-12">
          <h4>Fill the information to avail the offer</h4>
        <ol><li> Please enter your phone number for OTP verification.</li>
        <li>  After successful verification, you will receive the gift coupon via SMS.</li>
        <li> The SMS will be sent within 180 seconds of verification.</li></ol>
          
         </div> 
         </div> 
         <div className="row">
        <div className="col-lg-6">
        
       <div class="card-body">
         <h4>Terms and Conditions</h4>
         <ol >
          <li>You can use this coupon code bhimagold.com to buy your favourite jewellery. The coupon is not valid on coins, bars, and gift cards.</li>
          <li>Upon verification, you will receive a coupon code which you can use to redeem the offer at checkout.</li>
          <li>The coupon code can be redeemed only once.</li>
          <li>To redeem the coupon apply the code in the “Apply Your Promotion Coupon” section in the payment page.</li>
          <li>Only one coupon code can be redeemed for an order from a single account. </li>
          <li>The coupon code is only valid for purchase done through bhimagold.com and not valid at our retail outlets.</li>
           <li>This coupon code is valid from May 10th to July 10th 2024. </li>
          <li>Offer is valid only on select products and on purchase of INR 30,000 and above only.</li>
          <li>This offer cannot be clubbed with any other ongoing offers.</li>
          <li>For any queries, please write to us on support@bhimagold.com or call us on 1800-121-9076 (All days 10 am to 7 pm IST).</li>
          <li>In case of any dispute, Bhima Gold Private Limited’s decision will be final.</li>
          <li>The terms & conditions are subject to change any time, without any prior notice.</li>
          <li>All disputes are subject to Bengaluru jurisdiction only.</li>
         </ol>
         
 </div>
 </div>
      
  <div className='col-lg-6' >
  <div class="card" style={{borderColor:"black",height:"250px" ,marginBottom:"80px"}} padding="15px">
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
    marginTop:"20px",
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
              marginTop:"35px",
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
            marginTop:"35px",
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
