import React, { useState, useEffect } from 'react';

function VideoModal({ isOpen, onClose }) {
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        fetch('/config.json')
            .then(response => response.json())
            .then(data => {
                setVideoSrc(data.videoUrl);
            })
            .catch(error => {
                console.error('Failed to load configuration', error);
                setVideoSrc(''); // Handle error by setting default or empty URL
            });
    }, []);

    if (!isOpen) return null;

    const dialogStyles = {
        position: 'fixed',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '960px',
        height: 'auto',
        zIndex: '1050',
        backgroundColor: '#000',
        borderRadius: '8px',
        overflow: 'hidden',
    };

    const iframeStyles = {
        width: '100%',
        height: '500px',
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: '1049' }}>
            <div style={dialogStyles}>
                <iframe
                    style={iframeStyles}
                    src={videoSrc}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                ></iframe>
                <button type="button" className="closeicon" onClick={onClose}>&times;</button>
            </div>
        </div>
    );
}

export default VideoModal;
