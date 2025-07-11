
import React, { useState } from 'react';
import { Coffee, Heart, Zap } from 'lucide-react';
import './Footer.css';
import logo from "./logo.png";

const Footer = () => {
    const [footerClicks, setFooterClicks] = useState(0);
    const [showFooterSecret, setShowFooterSecret] = useState(false);
    const [funFact, setFunFact] = useState('');

    const funFacts = [
        'The first computer "bug" was an actual insect stuck in a relay! 🐞',
        'A single line of code can launch a rocket to space! 🚀',
        'The term "byte" was coined in 1956 by Werner Buchholz! 💾',
        'The first website is still online at CERN! 🌐'
    ];

    const handleFooterClick = () => {
        setFooterClicks(prev => prev + 1);
        if (footerClicks === 6) {
            const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
            setFunFact(randomFact);
            setShowFooterSecret(true);
            setTimeout(() => setShowFooterSecret(false), 3000);
            setFooterClicks(0);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-bg">
                <div className="footer-bg-circle-top-left"></div>
                <div className="footer-bg-circle-top-right"></div>
                <div className="footer-bg-circle-bottom"></div>
            </div>

            <div className="footer-container">


                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <img src={logo} alt="10x Engineers Logo"/>

                        <div className="footer-copyright">
                            <p className="footer-copyright-text">© 2025 10x Engineers. All rights reserved.</p>
                            <p
                                className="footer-copyright-secret"
                                onClick={handleFooterClick}
                            >
                                Made with <Heart className="footer-heart-icon"/> & <Coffee
                                className="footer-coffee-icon"/>
                                {footerClicks > 0 && <span className="footer-click-counter">({footerClicks}/7)</span>}
                            </p>
                        </div>
                        <div className="footer-powered">
                            <div className="footer-powered-content">

                            </div>
                        </div>
                    </div>
                </div>

                {showFooterSecret && (
                    <div className="footer-secret">
                        <div className="footer-secret-content">
                            <Coffee className="footer-secret-icon" />
                            <span className="footer-secret-text">{funFact}</span>
                        </div>
                    </div>
                )}
            </div>
        </footer>
    );
};

export default Footer;