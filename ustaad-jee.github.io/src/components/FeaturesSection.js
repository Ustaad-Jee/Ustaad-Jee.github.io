import React, { useState } from 'react';
import './FeaturesSection.css';

// SVG icon paths
const iconPaths = {
    book: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
    globe: "M21.54 15H17a2 2 0 0 0-2 2v4.54 M7 3.34V5a3 3 0 0 0 3 3h4a2 2 0 0 1 2 2v2.18l2.05 1.23a8 8 0 1 0-6.3 6.3h-2.18",
    "message-square": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
};

// Features data
const features = [
    {
        icon: "book",
        title: "Technical Glossary",
        description: "Build and manage comprehensive technical dictionaries with AI-powered definitions.",
        details: "Create custom glossaries, add technical terms, and get AI-generated explanations in Urdu",
        bgClass: "bg-green",
        gradientClass: "gradient-turquoise-cyan",
    },
    {
        icon: "globe",
        title: "Language Translation",
        description: "Translate technical documents into Urdu or Roman Urdu with ease.",
        details: "Advanced AI translation with context awareness for technical terminology and concepts.",
        bgClass: "bg-green",
        gradientClass: "gradient-turquoise-cyan",
    },
    {
        icon: "message-square",
        title: "Interactive Chat",
        description: "Chat with documents using our AI-powered chatbot for clarifications.",
        details: "Upload documents and have intelligent conversations about their content with contextual understanding.",
        bgClass: "bg-green",
        gradientClass: "gradient-turquoise-cyan",
    }

];

const FeaturesSection = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    // Create SVG icon component
    const createIcon = (iconName) => (
        <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="features-icon"
        >
            <path d={iconPaths[iconName]} />
        </svg>
    );

    // Create sparkles icon for badge
    const createSparklesIcon = () => (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0891b2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z" />
            <path d="M20 3v4 M22 5h-4 M6 16v4 M8 18H4" />
        </svg>
    );

    // Floating elements for visual effect
    const floatingElements = [
        { class: "floating-1", size: "32px" },
        { class: "floating-2", size: "24px" },
        { class: "floating-3", size: "16px" },
        { class: "floating-4", size: "12px" },
        { class: "floating-5", size: "20px" },
    ];

    return (
        <section id="features" className="features-section">
            <div className="features-bg">
                <div className="features-bg-circle-top"></div>
                <div className="features-bg-circle-right"></div>
                <div className="features-bg-circle-bottom"></div>
            </div>
            <div className="features-container">
                <div className="features-header">

                    <h2 className="features-title">
                        Key Features of <span className="features-title-gradient">Ustaad Jee's</span>
                        <br />
                        Knowledge Hub
                    </h2>
                    <p className="features-subtitle">
                        Discover the powerful tools that make learning accessible and engaging for everyone.
                    </p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`features-card ${hoveredCard === index ? 'hovered' : ''}`}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className={`features-card-bg ${feature.bgClass}`}></div>
                            <div className="features-icon-container">{createIcon(feature.icon)}</div>
                            <div className="features-card-content">
                                <h3 className="features-card-title">{feature.title}</h3>
                                <p className="features-card-text">{feature.description}</p>
                                <div className="expandable-details">
                                    <p>{feature.details}</p>
                                </div>
                            </div>
                            {floatingElements.map((element, idx) => (
                                <div
                                    key={idx}
                                    className={`floating-element ${element.class} ${feature.gradientClass}`}
                                    style={{ width: element.size, height: element.size }}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;