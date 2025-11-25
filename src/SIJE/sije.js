import React, { useState, useEffect } from 'react';
import '../SIJE/sije.css';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';
import Header from '../components/Header/header';


function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({ name: '', email: '', phone: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [conditionsContent, setConditionsContent] = useState('');
    const [isThankYouOpen, setIsThankYouOpen] = useState(false);
    const navigate = useNavigate(); 
    const validateName = (name) => {
        const regex = /^[^\d]+$/; // Regex to disallow digits
        return regex.test(name) ? '' : 'Name should contain only characters';
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email) ? '' : 'Invalid email format';
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{10,15}$/; // Regex to allow only digits and specify length
        return regex.test(phone) ? '' : 'Phone number should be 10 to 15 digits';
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        // Prevent entering digits in the name field
        if (!/\d/.test(value)) {
            setName(value);
            setErrors({ ...errors, name: formSubmitted ? validateName(value) : '' });
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setErrors({ ...errors, email: formSubmitted ? validateEmail(value) : '' });
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        // Prevent entering characters in the phone number field
        if (!/[^\d]/.test(value)) {
            setPhone(value);
            setErrors({ ...errors, phone: formSubmitted ? validatePhone(value) : '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true); // Set formSubmitted to true to display errors

        // Validate name
        if (!name || !name.trim()) {
            setErrors({ ...errors, name: 'Name is required' });
            return; // Exit early if name is empty
        } else {
            const nameError = validateName(name);
            setErrors({ ...errors, name: nameError });
        }

        // Validate email
        if (!email || !email.trim()) {
            setErrors({ ...errors, email: 'Email is required' });
            return; // Exit early if email is empty
        } else {
            const emailError = validateEmail(email);
            setErrors({ ...errors, email: emailError });
        }

        // Validate phone
        if (!phone || !phone.trim()) {
            setErrors({ ...errors, phone: 'Phone number is required' });
            return; // Exit early if phone number is empty
        } else {
            const phoneError = validatePhone(phone);
            setErrors({ ...errors, phone: phoneError });
        }

        // Check if any field has an error
        if (errors.name || errors.email || errors.phone) {
            return; // Exit if there are errors
        }

        // All fields are valid, submit the data to the API
        try {
            const response = await fetch('https://apis.bhimagold.com/api_db.js/api/sije', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone }),
            });

            if (response.ok) {
                    navigate('/thank-you');
            } else {
                console.error('Failed to submit the form');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };


    // Fetch conditions.html content when modal opens
    useEffect(() => {
        const fetchConditions = async () => {
            try {
                const response = await fetch('/Terms&condition.html'); // Adjust the path as needed
                const htmlContent = await response.text();
                setConditionsContent(htmlContent);
            } catch (error) {
                console.error('Error fetching conditions:', error);
            }
        };

        if (isModalOpen) {
            fetchConditions();
        }
    }, [isModalOpen]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container">
           <Header/>
            <div className="top-half">
                <img src='../images/Sije/SIJE.jpg' alt="SIJE" className="full-image web-image" />
                <img src='../images/Sije/Banner_Mobile.jpg' alt="SIJE" className="full-image mobile-image" />
                <div className="overlay">
                    <img src='../images/Sije/sije31.png' alt="SIJE" className="form-image" />
                    <div className="form-container">
                        <h1 className="heading">VISIT BHIMA AT SIJE</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={handleNameChange}
                                required
                            />
                            {formSubmitted && errors.name && <span className="error">{errors.name}</span>}
                            
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            {formSubmitted && errors.email && <span className="error">{errors.email}</span>}
                            
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={handlePhoneChange}
                                required
                            />
                            {formSubmitted && errors.phone && <span className="error">{errors.phone}</span>}
                            
                            <button type="submit" className="book-now">Learn More</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bottom-half">
                <div className='bottom-half-content'>
                    <p>
                   Join us from 10th to 13th July 2025 at the Sands Expo & Convention Centre,
                   Singapore. Explore our latest selection of exquisite jewellery, gems, and luxury timepieces.
                   Your presence will add sparkle to this glittering showcase.
                    </p>
                </div>
                <div className="bottom-half-image">
                    <img src="../images/Sije/venue.png" alt="Description of the image" />
                </div>
                <div className="bottom-half-image1">
                    <img src="../images/Sije/SijeCollection.jpg" alt="Description of the image" />
                </div>
                <div className="carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
                        <div>
                            <img src="../images/Sije/mob1.jpg" alt="Description of the image" />
                        </div>
                        <div>
                            <img src="../images/Sije/mob2.jpg" alt="Description of the image" />
                        </div>
                        <div>
                            <img src="../images/Sije/mob3.jpg" alt="Description of the image" />
                        </div>
                        <div>
                            <img src="../images/Sije/mob4.jpg" alt="Description of the image" />
                        </div>
                        {/* Add more images as needed */}
                    </Carousel>
                </div>
                <div className="terms">
                    <button onClick={() => setIsModalOpen(true)} className="terms-link">*Terms & Conditions</button>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>×</button>
                        <div className="modal-body">
                            <div dangerouslySetInnerHTML={{ __html: conditionsContent }} />
                        </div>
                    </div>
                </div>
            )}
            {isThankYouOpen && (
                <div className="thank-you-page">
                    <img src='../images/ThankYou_page-0001.jpg' alt="Thank You" />
                </div>
            )}
        </div>
    );
}

export default App;
