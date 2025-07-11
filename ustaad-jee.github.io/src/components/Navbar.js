import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import './Navbar.css';
import logo from './logo.png';

const Navbar = ({ isVisible }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [logoClicks, setLogoClicks] = useState(0);

    const handleLogoClick = () => {
        setLogoClicks(prev => prev + 1);
        if (logoClicks === 9) {
            alert('🎉 10x Engineer Mode Activated! You found the secret! 🚀');
            setLogoClicks(0);
        }
    };

    const handleSignInClick = () => {
        window.open('https://ustaadjee.streamlit.app/', '_blank');
    };

    return (
        <nav className={`navbar ${isVisible ? '' : 'hidden'}`}>
            <div className="navbar-container">
                <div className="logo-container" onClick={handleLogoClick}>
                    <img src={logo} alt="Logo" className="logo" />
                    {logoClicks > 0 && logoClicks < 10 && (
                        <div className="click-counter">
                            <Zap size={16} />
                            {logoClicks}
                        </div>
                    )}
                </div>

                <div className="nav-links">
                    <a href="/" className="nav-link">Home</a>
                    <a href="/features" className="nav-link">Features</a>
                    <a href="/about" className="nav-link">About</a>
                    <a href="/contact" className="nav-link">Contact</a>
                    <button className="sign-in-btn" onClick={handleSignInClick}>
                        Sign In
                    </button>
                </div>

                <div
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <a href="/" className="mobile-nav-link">Home</a>
                    <a href="/features" className="mobile-nav-link">Features</a>
                    <a href="/about" className="mobile-nav-link">About</a>
                    <a href="/contact" className="mobile-nav-link">Contact</a>
                    <button className="mobile-sign-in-btn" onClick={handleSignInClick}>
                        Sign In
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;