import React from 'react';
import { Book, MessageSquare, Lock, Globe } from 'lucide-react';
import './FeaturesSection.css';

const FeaturesSection = () => {
    const features = [
        {
            icon: <Book size={32} className="features-icon" />,
            title: "Language Translation",
            description: "Translate technical documents into Urdu or Roman Urdu with ease.",
            bgClass: "features-bg-blue"
        },
        {
            icon: <MessageSquare size={32} className="features-icon" />,
            title: "Interactive Chat",
            description: "Chat with documents using our AI-powered chatbot for clarifications.",
            bgClass: "features-bg-green"
        },
        {
            icon: <Lock size={32} className="features-icon" />,
            title: "Secure Access",
            description: "Firebase-based authentication ensures your data stays safe.",
            bgClass: "features-bg-purple"
        },
        {
            icon: <Globe size={32} className="features-icon" />,
            title: "Global Learning",
            description: "Access education offline with local LLM support.",
            bgClass: "features-bg-indigo"
        }
    ];

    return (
        <section className="features-section">
            <div className="features-bg">
                <div className="features-bg-circle-top"></div>
                <div className="features-bg-circle-right"></div>
                <div className="features-bg-circle-bottom"></div>
            </div>
            <div className="features-container">
                <div className="features-header">
                    <h2 className="features-title">
                        Key <span className="features-title-highlight">Features</span> of Ustaad Jee's Knowledge Hub
                    </h2>
                    <p className="features-subtitle">
                        Discover the powerful tools that make learning accessible and engaging.
                    </p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="features-card">
                            <div className={`features-card-bg ${feature.bgClass}`}></div>
                            <div className="features-icon-container">
                                {feature.icon}
                            </div>
                            <h3 className="features-card-title">{feature.title}</h3>
                            <p className="features-card-text">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;