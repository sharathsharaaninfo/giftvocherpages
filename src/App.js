import React, { useState, useEffect } from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import VideoModal from './components/VideoModal';
import Akshaya from './Akshaya/akshya';
import SIJE from './SIJE/sije'
import ThankYouPage from'./SIJE/ThankYouPage'
import Home from './components/Home/home';
import Akshayatritiya from './Akshayatritiya/Akshayatritiya'
import GiftPage from './GiftPage/giftpage';
import { BHIMAGALA_IMG,MYSURU_IMG,MADURAI_IMG,UDUPI_IMG,HOODI_IMG,HYD_IMG,GENERIC_IMG,HASSAN_IMG } from './Utils/imagePath';


function App() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    setVideoModalOpen(false);
  }, []);

  const handleClose = () => {
    setVideoModalOpen(false);
  };

  return (
    <div className="app">
        <Link to="/akshaya"></Link>
        {/* <InputBox />
        <VideoModal isOpen={videoModalOpen} onClose={handleClose} /> */}
      <Link to="/SIJE"></Link>
      <Link to="/Akshayatritiya"></Link>
      <Link to="/Bhimagala"></Link>
      <Link to="/Mysuru"></Link>
      <Link to="/Madurai"></Link>
      <Link to="/Hoodi"></Link>
      <Link to="/Hydrabad"></Link>
      <Link to="/Generic"></Link>
      <Link to="/Udupi"></Link>
      <Link to="/Hassan"></Link>
      <Link to="/thank-you"></Link>
      <Link to="/"></Link>
      {/* Add your routes here */}
      <Routes>
    
        <Route exact path="/akshaya" element={<Akshaya />} />
        <Route exact path="/SIJE" element={<SIJE />} />
        <Route exact path="/Akshayatritiya" element={<Akshayatritiya/>}/>
        <Route exact path="/Bhimagala" element={<GiftPage path='/Bhimagalaterms.html' bannerImg={BHIMAGALA_IMG.banner} mbBannerImg={BHIMAGALA_IMG.mbBanner}  campaignKey='bhimagala' />} />
        <Route exact path="/Mysuru" element={<GiftPage path='/MysoreTerms.html' bannerImg={MYSURU_IMG.banner} mbBannerImg={MYSURU_IMG.mbBanner} campaignKey='mysuru' />} />
        <Route exact path="/Madhurai" element={<GiftPage path='/MadhuraiTerms.html' bannerImg={MADURAI_IMG.banner} mbBannerImg={MADURAI_IMG.mbBanner} campaignKey='madurai' />} />
        <Route exact path="/Hoodi" element={<GiftPage path='/HoodiTerms.html' bannerImg={HOODI_IMG.banner} mbBannerImg={HOODI_IMG.mbBanner} campaignKey='hoodi' />} />
        <Route exact path="/Hydrabad" element={<GiftPage path='/HyderabadTerms.html' bannerImg={HYD_IMG.banner} mbBannerImg={HYD_IMG.mbBanner} campaignKey='hydrabad' />} />
        <Route exact path="/Generic" element={<GiftPage path='/GenericTerms.html' bannerImg={GENERIC_IMG.banner} mbBannerImg={GENERIC_IMG.mbBanner} campaignKey='generic' />} />
        <Route exact path="/Udupi" element={<GiftPage path='/conditions.html' bannerImg={UDUPI_IMG.banner} mbBannerImg={UDUPI_IMG.mbBanner} campaignKey='udupi' />} />
        <Route exact path="/Hassan" element={<GiftPage path='/HassanTerms.html' bannerImg={HASSAN_IMG.banner} mbBannerImg={HASSAN_IMG.mbBanner} campaignKey='hassan' />} />
        <Route exact path="/Tvm" element={<GiftPage path='/conditions.html' bannerImg={UDUPI_IMG.banner} mbBannerImg={UDUPI_IMG.mbBanner} campaignKey='udupi' />} />
        <Route exact path="/Cochin" element={<GiftPage path='/conditions.html' bannerImg={HASSAN_IMG.banner} mbBannerImg={HASSAN_IMG.mbBanner} campaignKey='hassan' />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route exact path="/" element={
          <div className="content">
            <Home />
            {/* <Mob/> */}
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
