import React, { useEffect, useRef, useState } from 'react';

const MiniGame = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const player = useRef({ x: 250, y: 350, width: 50, height: 20 });
    const stars = useRef([]);
    const animationFrameId = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Failed to get 2D context');
            return;
        }

        canvas.width = 600;
        canvas.height = 400;

        // Create a star
        const createStar = () => {
            return {
                x: Math.random() * (canvas.width - 20),
                y: -20,
                radius: 10,
                speed: 2 + Math.random() * 2,
            };
        };

        // Initialize stars
        stars.current = [];
        for (let i = 0; i < 5; i++) {
            stars.current.push(createStar());
        }

        // Handle mouse movement
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            player.current.x = e.clientX - rect.left - player.current.width / 2;
            if (player.current.x < 0) player.current.x = 0;
            if (player.current.x > canvas.width - player.current.width) {
                player.current.x = canvas.width - player.current.width;
            }
        };

        canvas.addEventListener('mousemove', handleMouseMove);

        // Game loop
        const gameLoop = () => {
            if (gameOver) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#fff';
                ctx.font = '40px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
                ctx.font = '20px Arial';
                ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
                ctx.textAlign = 'start';
                return;
            }

            try {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw player
                ctx.fillStyle = '#00bcd4';
                ctx.fillRect(player.current.x, player.current.y, player.current.width, player.current.height);

                // Collect indices of stars to remove
                const starsToRemove = [];
                stars.current.forEach((star, index) => {
                    star.y += star.speed;

                    // Simplified collision detection (bounding box)
                    if (
                        star.x > player.current.x &&
                        star.x < player.current.x + player.current.width &&
                        star.y + star.radius > player.current.y &&
                        star.y - star.radius < player.current.y + player.current.height
                    ) {
                        console.log('Star caught! Score before update:', score);
                        setScore((prev) => {
                            const newScore = prev + 10;
                            console.log('New score:', newScore);
                            return newScore;
                        });
                        starsToRemove.push(index);
                    }

                    // Draw star
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                    ctx.fillStyle = '#ffd700';
                    ctx.fill();

                    // Mark stars that go off-screen
                    if (star.y - star.radius > canvas.height) {
                        starsToRemove.push(index);
                    }
                });

                // Remove stars and add new ones outside the loop
                stars.current = stars.current.filter((_, index) => !starsToRemove.includes(index));
                starsToRemove.forEach(() => stars.current.push(createStar()));

                // Draw score
                ctx.fillStyle = '#fff';
                ctx.font = '20px Arial';
                ctx.fillText(`Score: ${score}`, 10, 30);

                // Add new stars periodically
                if (Math.random() < 0.02) {
                    stars.current.push(createStar());
                }

                animationFrameId.current = requestAnimationFrame(gameLoop);
            } catch (error) {
                console.error('Error in game loop:', error);
            }
        };

        gameLoop();

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [gameOver]);

    const handleRestart = () => {
        setScore(0);
        setGameOver(false);
        player.current.x = 250;
        stars.current = [];
        for (let i = 0; i < 5; i++) {
            stars.current.push({
                x: Math.random() * (canvasRef.current.width - 20),
                y: -20,
                radius: 10,
                speed: 2 + Math.random() * 2,
            });
        }
    };

    const handleEndGame = () => {
        setGameOver(true);
    };

    return (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
            <h3 style={{ color: '#1a202c', marginBottom: '1rem' }}>Catch the Stars!</h3>
            <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
                Move your paddle with the mouse to catch falling stars.
            </p>
            <canvas
                ref={canvasRef}
                style={{ background: '#1a202c', borderRadius: '0.5rem', display: 'block', margin: '0 auto' }}
            ></canvas>
            <div style={{ marginTop: '1rem' }}>
                <button
                    onClick={handleRestart}
                    style={{
                        padding: '0.5rem 1rem',
                        background: '#00bcd4',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        marginRight: '1rem',
                    }}
                >
                    Restart Game
                </button>
                <button
                    onClick={handleEndGame}
                    style={{
                        padding: '0.5rem 1rem',
                        background: '#ff4444',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                    }}
                >
                    End Game
                </button>
            </div>
        </div>
    );
};

export default MiniGame;