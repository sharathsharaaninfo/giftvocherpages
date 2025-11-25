import React, { useState, useEffect } from 'react';
import './Giftpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from '../components/Header/header';
import ReactGA from 'react-ga';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VoucherDetailsModal from './VoucherDetailsModal';
import { getSendOtpUrl, getValidateOtpUrl, getCouponDetailsUrl } from '../Utils/apiUrls';
import axios from 'axios';

function OtpModal({ isOpen, onClose, onVerify, onResend, mobile, setOtpModalOpen, setIsOtpVerified }) {

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('')

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleVerify = async (otp) => {
    if (otp.trim() === '') {
      setOtpError('OTP is required');
      return;
    }
    setOtpError(''); // Clear previous errors

    try {
      // Call the validateOtp function with the mobile number and OTP
      const verificationUrl = getValidateOtpUrl(mobile, otp);
      const response = await axios.get(verificationUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.data;
      console.log(responseData);  // Log the full response data to ensure it's what we expect

      // Check if the response indicates success
      if (response.status >= 200 && response.status < 300) {
        console.log('OTP verification successful');
        setIsOtpVerified(true);
        setOtpModalOpen(false);
      } else {
        // Handle case where OTP is not valid according to the server
        console.log('Invalid OTP');
        setOtpError(responseData.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('Error during OTP verification. Please try again later.');
    }
  };


  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog" >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enter OTP</h5>
            <button type="button" className="close" style={{ color: "red" }} onClick={onClose}>
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
                style={{ borderColor: "black", border: "" }}
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
                margin: "auto",
                color: "white",
                backgroundImage: "linear-gradient(to right, #804000,#be8d48, #804000)",
                verticalAlign: "middle",
              }}
              onClick={() => handleVerify(otp)}>Verify</button>

            <button type="button" className="btn btn-info" hidden={true} onClick={onResend}>Resend OTP</button>
          </div>
        </div>
      </div>
    </div>
  );
}


function App({ path, bannerImg, mbBannerImg, campaignKey }) {
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [voucherDetails, setVoucherDetails] = useState(null);
  const [isOtpverified, setIsOtpVerified] = useState(false)
  const [isCouponClaimed, setIsCouponClaimed] = useState(false);
  const [isClaimButtonClicked, setIsClaimButtonClicked] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [clearCache, setClearCache] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [codes, setCodes] = useState({});
  const [code, setCode] = useState(null);


  const handleCopyClick = () => {
    if (voucherDetails && voucherDetails.code) {
      navigator.clipboard.writeText(voucherDetails.code)
        .then(() => setCopySuccess('Copied!'))
        .catch(err => setCopySuccess('Failed to copy!'));
    }
  };

  useEffect(() => {
    fetch(path) // change this to the correct path of your terms and conditions file
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
    if (mobile.trim() === '' || mobile.length < 10) {
      setMobileError('Enter Valid Mobile No');
      return;
    }
    try {

      const apiUrl = getSendOtpUrl(mobile); // get the API URL for sending OTP

      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.data;
      console.log(responseData);
      if (response.status >= 200 && response.status < 300) {
        setOtpSent(true);
        setOtpModalOpen(true);
        console.log('OTP sent successfully');
        setClearCache(!clearCache);
      } else {
        console.log('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
  // resend OTP
  const handleResend = async () => {
    if (!mobile) return;
    try {
      const apiUrl = getSendOtpUrl(mobile); // Use the same API as handleSend
      const response = await axios.get(apiUrl, {
        headers: { 'Content-Type': 'application/json' },
      });

      const responseData = await response.data;
      console.log(responseData);

      if (response.status >= 200 && response.status < 300) {
        setOtpSent(true);
        console.log('OTP resent successfully');
      } else {
        console.log('Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
    }
  };

  
  useEffect(() => {
    fetch('/CouponCode.json')
      .then((response) => response.json())
      .then((data) => setCodes(data))
      .catch((error) => console.error('Error fetching codes:', error));
  }, []);

  useEffect(() => {
    const selectedCode = codes?.[campaignKey];
    if (campaignKey && selectedCode !== undefined) {
      setCode(selectedCode);
      console.log('Selected code for campaign:', campaignKey, 'is', selectedCode);
    }
  }, [codes, campaignKey]);

  // to claim coupon
  const claimCoupon = async () => {
    try {
      setIsClaimButtonClicked(true);
      const claimRequestBody = {
        VoucherCode: 'Bhima',
        CustomerName: 'Bhima Jewellers',
        MobileNo: mobile,
      };
      // const allOriginsUrl = 'https://api.allorigins.win/raw?url=';
      const apiUrl = 'https://giftcardwebapis.bhima.info/api_db.js/api/bhima/akvouchercode';
      //const fullApiUrl = allOriginsUrl + encodeURIComponent(apiUrl);

      console.log('Claim URL:', apiUrl);
      console.log('Request Body:', claimRequestBody);

      const claimResponse = await axios.post(apiUrl, claimRequestBody, {
        headers: { 'Content-Type': 'application/json' },
      });


      const claimResponseData = await claimResponse.data;
      console.log('Claim Response Status:', claimResponse.status);
      console.log('Claim Response Data:', claimResponseData);

      console.log(claimResponseData);

      if (claimResponseData.status >= 200 && claimResponseData.status < 300) {
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


  // const claimCoupon = async () => {
  //   try {
  //     setIsClaimButtonClicked(true);

  //     // Modify the request body to only include mobile number
  //     const claimRequestBody = {
  //       MobileNo: mobile,
  //     };

  //     // Replace the API URL with the new API URL and append the mobile number as a query parameter
  //     const apiUrl = getCouponDetailsUrl(mobile, code); 

  //     console.log('Claim URL:', apiUrl);
  //     console.log('Request Body:', claimRequestBody);

  //     const claimResponse = await fetch(apiUrl, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     const claimResponseData = await claimResponse.json();
  //     console.log('Claim Response Status:', claimResponse.status);
  //     console.log('Claim Response Data:', claimResponseData);

  //     console.log(claimResponseData);

  //     if (claimResponse.ok) {
  //       console.log('Gift coupon claimed successfully');
  //       setVoucherDetails({
  //         code: claimResponseData.code,
  //         message: claimResponseData.message,
  //       });
  //       setIsCouponClaimed(true);
  //       setShowVoucherModal(true);  // Open the modal when the coupon is claimed successfully
  //     } else {
  //       console.log('Failed to claim gift coupon');
  //     }

  //   } catch (error) {
  //     console.error('Error claiming gift coupon:', error);
  //   }
  // };


  const handleVerify = async (otp) => {
    try {
      const verificationUrl = getValidateOtpUrl(mobile, otp); // get the API URL for validating OTP;
      console.log(verificationUrl);
      const response = await axios.get(verificationUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.data;
      console.log(responseData);

      if (response.status >= 200 && response.status < 300) {
        console.log('OTP verification successful');
        setOtpModalOpen(false);
        setIsOtpVerified(true);

      } else {
        console.log('Invalid OTP');

      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };


  // const handleVerify = () =>{
  //   console.log('otp');

  // }

  // const handleResend = () => {

  //   if (otpSent) {
  //     console.log('Resending OTP');
  //   }
  // };


  return (
    <div className="page-content ">
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-12">
            <Header />
            <div className="banner-container">
              <img src={bannerImg} alt="Background" className="desktop-banner img-fluid" />
              <img src={mbBannerImg} alt="Mobile Background" className="mobile-banner img-fluid" />
            </div>
          </div>
        </div>

        <div className="row mobile-steps "  >
          <div className="col-lg-7 mobile-steps ">
            <div className="card-body mobile-steps">

              <div className="terms-container" dangerouslySetInnerHTML={{ __html: termsAndConditions }} />
            </div>
          </div>
          <div className="col-lg-5">
            <h5 className="h5-heading" >Fill the information to avail the offer</h5>
            <div className="card textbox" >
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1" style={{ color: "black" }}></label>
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
                    maxLength={10}
                    style={{
                      margin: "auto",
                      marginTop: "1px",
                      fontFamily: "baskerville!important",
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
                        color: "white",
                        margin: "auto",
                        marginTop: "60px",
                        backgroundImage: "linear-gradient(to right, #804000,#be8d48, #804000)",
                        justifyItems: "center",
                        letterSpacing: ".5px",
                        boxShadow: "none"

                      }}
                    >
                      Claim Your Gift Coupon Now!
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleSend}
                    style={{
                      display: "block",
                      margin: "auto",
                      marginTop: "60px",
                      color: "white",
                      backgroundImage: "linear-gradient(to right, #804000,#be8d48, #804000)",
                      letterSpacing: ".5px",
                      boxShadow: "none",
                      left: ".5px",



                    }}
                    className="btn"

                  >
                    Send OTP to Your Mobile Number
                  </button>
                )}
              </div>
              {voucherDetails && (
                <div className="voucher-details">
                  {voucherDetails.code ? (
                    <>

                      <p>Your Gift Coupon</p>
                      <p className={voucherDetails.code ? 'green-text' : 'red-text'}>
                        Code: {voucherDetails.code}
                        <IconButton onClick={handleCopyClick} size="small" color="primary">
                          <ContentCopyIcon />
                        </IconButton>
                      </p>
                      {copySuccess && <div style={{ color: 'green' }}>{copySuccess}</div>}



                    </>
                  ) : (
                    <p style={{ color: "#D10000", fontFamily: "revert-layer", fontWeight: "bold", textAlign: "center", marginBottom: "40px" }}>{voucherDetails.message}</p>
                  )}
                  <p>
                    {voucherDetails.CardNumber && voucherDetails.CardPIN
                      ? <span>
                        Valid Till next one month. Copy of the coupon code has been sent to your mobile number.

                      </span>

                      : ''}

                  </p>
                  {voucherDetails.code && (
                    <button style={{
                      color: "white",
                      backgroundImage: "linear-gradient(to right, #804000,#be8d48, #804000)",
                      left: ".5px",
                      marginBottom: "2px"

                    }}>
                      <a href="https://www.bhimagold.com/jewellery/exclusive-offer" className="btn" style={{ color: 'white' }}
                      >Continue Shopping</a>

                    </button>
                  )}
                </div>
              )}

              <VoucherDetailsModal
                isOpen={showVoucherModal}
                onClose={() => setShowVoucherModal(false)}
                voucherDetails={voucherDetails}
                copySuccess={copySuccess}
                onCopyClick={handleCopyClick}
              />

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
