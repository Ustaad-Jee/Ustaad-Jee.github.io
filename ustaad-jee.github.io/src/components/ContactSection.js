import React, { useState, useEffect } from 'react';
import { Send, Mail, MessageCircle, Zap, Coffee } from 'lucide-react';
import MiniGame from './MiniGame';
import './ContactSection.css';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [konamiCode, setKonamiCode] = useState([]);
    const [showKonami, setShowKonami] = useState(false);
    const [showGame, setShowGame] = useState(false);

    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

    useEffect(() => {
        const handleKeyDown = (e) => {
            const newCode = [...konamiCode, e.key].slice(-8);
            setKonamiCode(newCode);

            if (newCode.join('') === konamiSequence.join('')) {
                setShowKonami(true);
                setShowGame(true);
                setTimeout(() => setShowKonami(false), 4000);
                setKonamiCode([]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [konamiCode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://formspree.io/f/your-form-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    _subject: `New Contact Form Submission from ${formData.name}`,
                    _replyto: formData.email,
                    _to: 'app_support@10xengineers.ai',
                }),
            });

            if (response.ok) {
                alert('Thank you for your message! We&aspos;ll get back to you soon. 🚀');
                setFormData({ name: '', email: '', message: '' });
            } else {
                alert('There was an error sending your message. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const closeGame = () => {
        setShowGame(false);
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-bg-circle-top"></div>
            <div className="contact-bg-circle-bottom"></div>
            <div className="contact-bg-circle-middle"></div>

            <div className="contact-container">
                <div className="contact-header">
                    <h2 className="contact-title">
                        Get In
                        <span className="contact-title-highlight"> Touch</span>
                    </h2>
                    <p className="contact-subtitle">
                        Have questions about document translation or need help with our platform?
                    </p>
                    <p className="contact-hint">
                        💡 Try the Konami code for a surprise!
                    </p>
                </div>

                <div className="contact-form-container">
                    <div className="contact-form">
                        <div className="contact-form-bg"></div>
                        <div className="contact-form-content">
                            <div className="contact-form-group">
                                <label htmlFor="name" className="contact-label">
                                    <span>Your Name</span>
                                    <span className="contact-label-required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="contact-input"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="contact-form-group">
                                <label htmlFor="email" className="contact-label">
                                    <Mail className="contact-label-icon" />
                                    <span>Email Address</span>
                                    <span className="contact-label-required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="contact-input"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="contact-form-group">
                                <label htmlFor="message" className="contact-label">
                                    <MessageCircle className="contact-label-icon" />
                                    <span>Message</span>
                                    <span className="contact-label-required">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="contact-textarea"
                                    placeholder="Tell us about your experience or ask questions..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`contact-button ${isSubmitting ? 'contact-button-disabled' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="contact-spinner"></div>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="contact-button-icon" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {showKonami && (
                    <div className="contact-konami">
                        <div className="contact-konami-content">
                            <div className="contact-konami-icons">
                                <Zap className="contact-konami-icon pulse" />
                                <Coffee className="contact-konami-icon bounce" />
                                <Zap className="contact-konami-icon pulse" />
                            </div>
                            <h3 className="contact-konami-title">🎮 Konami Code Activated!</h3>
                            <p className="contact-konami-text">You've unlocked a mini-game! Catch the stars! 🚀</p>
                        </div>
                    </div>
                )}

                {showGame && (
                    <div className="game-modal">
                        <div className="game-modal-content">
                            <button onClick={closeGame} className="game-close-button">Close</button>
                            <MiniGame />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ContactSection;