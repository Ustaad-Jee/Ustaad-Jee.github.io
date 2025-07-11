import React, { useState } from 'react';
import { Play } from 'lucide-react';
import './VideoSection.css';

const VideoSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section id="video-section" className="video-section">
            <div className="video-bg-circle-top-left"></div>
            <div className="video-bg-circle-bottom-right"></div>

            <div className="video-container">
                <div className="video-header">
                    <h2 className="video-title">
                        See Ustaad Jee's Knowledge Hub In
                        <span className="video-title-highlight"> Action</span>
                    </h2>
                    <p className="video-subtitle">
                        Watch how easy it is to translate technical documents and chat in Urdu
                    </p>
                </div>

                <div className="video-player-container">
                    <div
                        className="video-player"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className={`video-player-bg ${isHovered ? 'video-player-bg-hovered' : ''}`}>
                            <div className="video-bg-ping"></div>
                            <div className="video-bg-pulse"></div>
                            <div className="video-bg-bounce"></div>
                        </div>

                        {!isPlaying ? (
                            <button
                                onClick={() => setIsPlaying(true)}
                                className="video-play-button"
                            >
                                <Play className="video-play-icon" />
                                <div className="video-play-button-glow"></div>
                            </button>
                        ) : (
                            <video className="video-player-video" controls>
                                <source src="ustaad-jee.github.io/src/components/demo.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;