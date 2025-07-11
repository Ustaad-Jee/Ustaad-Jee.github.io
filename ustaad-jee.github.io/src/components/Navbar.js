
import React, { useState } from 'react';
import {FileText, Menu, X, Zap} from 'lucide-react';
import './Navbar.css';
import logo from './logo.png';

const Navbar = ({ isVisible }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [logoClicks, setLogoClicks] = useState(0);

    const handleLogoClick = () => {
        setLogoClicks(prev => prev + 1);
        if (logoClicks === 10) {
            alert('🎉 10x Engineer Mode Activated! You found an EasterEgg!');
            setLogoClicks(0);
        }
    };
    const handleSignInClick = () => {
        window.open('https://ustaadjee.streamlit.app/', '_blank');
    };

    return (
        <nav className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
            <div className="navbar-bg"></div>
            <div className="navbar-container">
                <div className="navbar-content">
                    <div className="navbar-logo" onClick={handleLogoClick}>
                        <img src={logo} alt="10x Engineers Logo" className="navbar-logo-img" />
                        {logoClicks > 0 && logoClicks < 10 && (
                            <div className="navbar-logo-counter">{logoClicks}</div>
                        )}
                    </div>

                    <div className="navbar-links">
                        <a href="#home" className="navbar-link">
                            Home
                            <span className="navbar-link-underline"></span>
                        </a>
                        <a href="#features" className="navbar-link">
                            Features
                            <span className="navbar-link-underline"></span>
                        </a>
                        <a href="#about" className="navbar-link">
                            About
                            <span className="navbar-link-underline"></span>
                        </a>
                        <a href="#contact" className="navbar-link">
                            Contact
                            <span className="navbar-link-underline"></span>
                        </a>
                        <button className="navbar-signin" onClick={handleSignInClick}>
                            <Zap className="navbar-signin-icon"/>
                            <span>Sign In</span>
                        </button>
                    </div>

                    <button
                        className="navbar-mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ?
                            <X className="navbar-mobile-icon" /> :
                            <Menu className="navbar-mobile-icon" />
                        }
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="navbar-mobile-menu">
                    <div className="navbar-mobile-links">
                        <a href="#home" className="navbar-mobile-link">Home</a>
                        <a href="#features" className="navbar-mobile-link">Features</a>
                        <a href="#about" className="navbar-mobile-link">About</a>
                        <a href="#contact" className="navbar-mobile-link">Contact</a>
                        <button className="navbar-mobile-signin">
                            <Zap className="navbar-signin-icon"/>
                            <button className="sign-in-btn" onClick={handleSignInClick}>
                                Sign In
                            </button>

                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
