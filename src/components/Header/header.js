import React, { useEffect } from 'react';
import {LOGO_IMG} from '../../Utils/imagePath'; // Adjust the path as necessary
import './header.css'; // Adjust the path as necessary

const Header = () => {
  useEffect(() => {
    // Add GTM script to head
    const script = document.createElement('script');
    script.innerHTML = `(function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),
      dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-N32ZM634');`;
    document.head.appendChild(script);

    // Add noscript to body
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N32ZM634" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);

    // Cleanup function to remove script and noscript when the component unmounts
    return () => {
      document.head.removeChild(script);
      document.body.removeChild(noscript);
    };
  }, []);

  return (
    <div className="header">
      <div className='logo'>
        <a href='https://bhimagold.com'>
          <img src={LOGO_IMG.logo} alt='Logo alt' className='logo img-fluid' />
        </a>
      </div>
    </div>
  );
};

export default Header;
