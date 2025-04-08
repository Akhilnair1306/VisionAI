import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import InfoSection from '../components/InfoSection'
import EyeFormSection from '../components/EyeFormSection'
import WhyChooseUs from '../components/WhyChooseUs'
import LoginModal from '../components/LoginModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleFormAccess = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className={`${showLoginModal ? 'filter blur-sm' : ''}`}>
        <div className={showLoginModal ? 'pointer-events-none' : ''}>
          <NavBar isLoggedIn={isLoggedIn} onLoginClick={() => setShowLoginModal(true)} />
          <Hero />
          <WhyChooseUs />
          <EyeFormSection onFormAccess={handleFormAccess} />
          <InfoSection />
        </div>
      </div>
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => setIsLoggedIn(true)}
      />
      
      <ToastContainer />
    </>
  )
}

export default HomePage