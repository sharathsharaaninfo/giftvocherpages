import axios from 'axios';
import { getSendOtpUrl } from './apiUrls';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ error: 'Mobile number is required' });
    }

    const apiUrl = getSendOtpUrl(mobile); // get the API URL for sending OTP

    try {
      const response = await axios.get(apiUrl);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}