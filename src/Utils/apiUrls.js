const BASE_URL = 'https://bgapis.bhimagold.com/api_db.js/api/';

// Function to generate the Send OTP URL
export const getSendOtpUrl = (mobile) => `${BASE_URL}Sendotp/${mobile}`;

// Function to generate the Validate OTP URL
export const getValidateOtpUrl = (mobile, otp) => `${BASE_URL}Validateotp/${mobile}/${otp}`;

// Function to generate the Get Coupon Details URL
export const getCouponDetailsUrl = (mobile, couponId) => `${BASE_URL}Getcoupondeatils/${encodeURIComponent(mobile)}/${couponId}`;


// export const getCouponDetailsUrl = (mobile, couponId, selectedBranch) =>
//     `${BASE_URL}ATUserDetails/${encodeURIComponent(mobile)}/${couponId}?branch=${encodeURIComponent(selectedBranch)}`;
  
export const AKBASE_URL = 'https://bgapis.bhimagold.com/api_db.js/api/';