// import React, { useState, useEffect } from 'react';
// import bannerImage from "../images/banner.jpg";
// import mobileBannerImage from '../images/mobilebanner.jpg';
// import '../components/style.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import logoImage from "../images/logo2.jpg";
// import { apiUrls } from '../config'; // Import the apiUrls from your config file

// // ...

// const handleSend = async () => {
//   if (mobile.trim() === '') {
//     setMobileError('Mobile number is required');
//     return;
//   }
//   try {
//     const apiUrl = `${apiUrls.sendOtp}/${mobile}`; // Use the API URL from config.js
    
//     const response = await fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     // ...
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//   }
// };

// const claimCoupon = async () => {
//   try {
//     setIsClaimButtonClicked(true);
//     const claimRequestBody = {
//       VoucherCode: 'Bhima',
//       CustomerName: 'Bhima Jewellers',
//       MobileNo: mobile,
//     };

//     const apiUrl = apiUrls.claimGiftCoupon; // Use the API URL from config.js

//     // ...
//   } catch (error) {
//     console.error('Error claiming gift coupon:', error);
//   }
// };

// // ...

{/* <img src="/banner.jpg" alt="Banner" className="desktop-banner img-fluid" />
<img src="/mobilebanner.jpg" alt="Mobile Banner" className="mobile-banner img-fluid" /> */}
