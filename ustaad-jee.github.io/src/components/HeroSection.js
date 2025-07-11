import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, FileText, Languages, Code, Sparkles } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
    const [isAnimated, setIsAnimated] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsAnimated(true);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX - window.innerWidth / 2) / 25,
                y: (e.clientY - window.innerHeight / 2) / 25
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleWatchDemoClick = () => {
        const videoSection = document.getElementById('video-section');
        if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleStartTranslatingClick = () => {
        window.open('https://ustaadjee.streamlit.app/', '_blank');
    };

    return (
        <section id="home" className="hero-section">
            <div className="hero-bg">
                <div
                    className="hero-bg-circle-left"
                    style={{
                        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                    }}
                ></div>
                <div
                    className="hero-bg-circle-right"
                    style={{
                        transform: `translate(${-mousePosition.x}px, ${mousePosition.y}px)`
                    }}
                ></div>
                <div
                    className="hero-bg-circle-bottom"
                    style={{
                        transform: `translate(${mousePosition.x * 0.5}px, ${-mousePosition.y}px)`
                    }}
                ></div>
            </div>

            <div className="hero-container">
                <div className={`hero-content ${isAnimated ? 'hero-content-animated' : ''}`}>
                    <div className="hero-logo">
                        <div className="hero-logo-container">
                            <div className="hero-logo-icon">
                                <Code className="hero-code-icon" />
                                <div className="hero-logo-glow"></div>
                            </div>
                            <div className="hero-logo-sparkle">
                                <Sparkles className="hero-sparkle-icon" />
                            </div>
                            <div className="hero-logo-badge">
                                <span className="hero-logo-badge-text">10x</span>
                            </div>
                        </div>
                    </div>

                    <h1 className="hero-title">
                        Welcome to
                        <span className="hero-title-highlight">Ustaad Jee's Knowledge Hub</span>
                    </h1>

                    <p className="hero-subtitle">
                        Breaking language barriers in technical education. Translate complex documents into simple Urdu and Roman Urdu,
                        making knowledge accessible to everyone in their native language.
                    </p>

                    <div className="hero-buttons">
                        <button className="hero-button secondary" onClick={handleWatchDemoClick}>
                            <Play className="hero-button-icon" />
                            <span>Watch Demo</span>
                        </button>
                        <button className="hero-button primary" onClick={handleStartTranslatingClick}>
                            <FileText className="hero-button-icon" />
                            <span>Start Translating Now</span>
                        </button>
                    </div>
                </div>

                <div className="hero-scroll" style={{ bottom: '4rem', left: '50%', transform: 'translateX(-50%)' }}>
                    <ChevronDown className="hero-scroll-icon" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;