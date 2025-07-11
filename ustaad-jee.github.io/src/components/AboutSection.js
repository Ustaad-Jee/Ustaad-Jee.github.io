import React, { useState } from 'react';
import { Code ,CLLS, Target, Users, Lightbulb, Coffee, Heart, Rocket } from 'lucide-react';
import './AboutSection.css';

const AboutSection = () => {
    const [secretClicks, setSecretClicks] = useState(0);
    const [showSecret, setShowSecret] = useState(false);

    const handleSecretClick = () => {
        setSecretClicks(prev => prev + 1);
        if (secretClicks === 4) { // 5 clicks total
            setShowSecret(true);
            setTimeout(() => setShowSecret(false), 5000);
            setSecretClicks(0);
        }
    };

    return (
        <section id="about" className="about-section">
            {/* Background decorations */}
            <div className="about-bg-circle-top-right"></div>
            <div className="about-bg-circle-bottom-left"></div>

            <div className="about-container">
                <div className="about-grid">
                    <div>
                        <h2 className="about-title">
                            About
                            <span className="about-title-highlight">Our Mission</span>
                        </h2>
                        <p className="about-text">
                            10x Engineers Knowledge Hub bridges the critical gap between technical education and language accessibility.
                            We recognize that developers think and process information more naturally in their native language, making
                            technical education more effective and inclusive for the Urdu-speaking community.
                        </p>
                        <p className="about-text">
                            Our platform translates complex technical content into simple Urdu or Roman Urdu, uses everyday examples
                            for better comprehension, and maintains technical accuracy through intelligent glossary management.
                        </p>
                        <div className="about-tags">
                            <div className="about-tag language">
                                <Target className="about-tag-icon" />
                                <span>Language Translation</span>
                            </div>
                            <div className="about-tag education">
                                <Lightbulb className="about-tag-icon" />
                                <span>Technical Education</span>
                            </div>
                            <div className="about-tag accessibility">
                                <Users className="about-tag-icon" />
                                <span>Cultural Accessibility</span>
                            </div>
                        </div>
                    </div>

                    <div className="about-card-container">
                        <div className="about-card">
                            <div className="about-card-content">
                                <div className="about-card-icon-container">
                                    <Code
                                        className="about-card-icon"
                                        onClick={handleSecretClick}
                                    />
                                    {secretClicks > 0 && (
                                        <div className="about-card-counter">
                                            {secretClicks}
                                        </div>
                                    )}
                                </div>
                                <h3 className="about-card-title">Ready to Code?</h3>
                                <p className="about-card-text">Join thousands of developers accessing technical knowledge in their native language</p>
                                <button className="about-card-button">
                                    <Rocket className="about-card-button-icon" />
                                    <span>Start Your Journey</span>
                                </button>
                            </div>
                        </div>
                        <div className="about-card-bg"></div>
                    </div>
                </div>

                {/* Secret message */}
                {showSecret && (
                    <div className="about-secret">
                        <div className="about-secret-content">
                            <div className="about-secret-icons">
                                <Coffee className="about-secret-icon bounce" />
                                <Heart className="about-secret-icon pulse" />
                                <Code className="about-secret-icon spin" />
                            </div>
                            <h3 className="about-secret-title">🎉 Developer Secret!</h3>
                            <p className="about-secret-text">We're just a bunch of developers who love coffee, code, and making tech accessible to everyone! ☕💻❤️</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AboutSection;
