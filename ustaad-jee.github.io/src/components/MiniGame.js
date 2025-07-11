import React, { useEffect, useRef, useState } from 'react';

const SpaceShooter = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [level, setLevel] = useState(1);
    const [health, setHealth] = useState(100);
    const [ammo, setAmmo] = useState(50);
    const [gameStarted, setGameStarted] = useState(false);

    const animationFrameId = useRef(null);
    const gameState = useRef({
        player: { x: 275, y: 350, width: 50, height: 30 },
        bullets: [],
        enemies: [],
        particles: [],
        powerUps: [],
        stars: [],
        keys: {},
        lastShot: 0,
        enemySpawnTimer: 0,
        powerUpSpawnTimer: 0
    });

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = 600;
        canvas.height = 400;

        // Initialize background stars
        if (gameState.current.stars.length === 0) {
            for (let i = 0; i < 50; i++) {
                gameState.current.stars.push({
                    x: Math.random() * 600,
                    y: Math.random() * 400,
                    speed: 0.5 + Math.random() * 1.5
                });
            }
        }

        // Event handlers
        const handleKeyDown = (e) => {
            gameState.current.keys[e.key] = true;
        };

        const handleKeyUp = (e) => {
            gameState.current.keys[e.key] = false;
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            gameState.current.player.x = e.clientX - rect.left - gameState.current.player.width / 2;
            gameState.current.player.x = Math.max(0, Math.min(canvas.width - gameState.current.player.width, gameState.current.player.x));
        };

        const handleClick = () => {
            if (ammo > 0 && Date.now() - gameState.current.lastShot > 200) {
                gameState.current.bullets.push({
                    x: gameState.current.player.x + gameState.current.player.width / 2 - 2,
                    y: gameState.current.player.y,
                    width: 4,
                    height: 10
                });
                gameState.current.lastShot = Date.now();
                setAmmo(prev => Math.max(0, prev - 1));
            }
        };

        // Add event listeners
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Game loop
        const gameLoop = () => {
            if (gameOver) return;

            // Clear canvas
            ctx.fillStyle = '#0a0a2e';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw stars
            gameState.current.stars.forEach(star => {
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = -5;
                    star.x = Math.random() * canvas.width;
                }
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(star.x, star.y, 1, 1);
            });

            // Player movement with keys
            if (gameState.current.keys['ArrowLeft'] || gameState.current.keys['a']) {
                gameState.current.player.x -= 5;
            }
            if (gameState.current.keys['ArrowRight'] || gameState.current.keys['d']) {
                gameState.current.player.x += 5;
            }
            if (gameState.current.keys['ArrowUp'] || gameState.current.keys['w']) {
                gameState.current.player.y -= 5;
            }
            if (gameState.current.keys['ArrowDown'] || gameState.current.keys['s']) {
                gameState.current.player.y += 5;
            }

            // Keep player in bounds
            gameState.current.player.x = Math.max(0, Math.min(canvas.width - gameState.current.player.width, gameState.current.player.x));
            gameState.current.player.y = Math.max(0, Math.min(canvas.height - gameState.current.player.height, gameState.current.player.y));

            // Spacebar shooting
            if (gameState.current.keys[' '] && ammo > 0 && Date.now() - gameState.current.lastShot > 200) {
                gameState.current.bullets.push({
                    x: gameState.current.player.x + gameState.current.player.width / 2 - 2,
                    y: gameState.current.player.y,
                    width: 4,
                    height: 10
                });
                gameState.current.lastShot = Date.now();
                setAmmo(prev => Math.max(0, prev - 1));
            }

            // Draw player
            ctx.fillStyle = '#00bcd4';
            ctx.fillRect(gameState.current.player.x, gameState.current.player.y, gameState.current.player.width, gameState.current.player.height);

            // Update bullets
            gameState.current.bullets = gameState.current.bullets.filter(bullet => {
                bullet.y -= 8;
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
                return bullet.y > -bullet.height;
            });

            // Spawn enemies
            gameState.current.enemySpawnTimer++;
            if (gameState.current.enemySpawnTimer > Math.max(60, 120 - level * 10)) {
                const enemyType = Math.random();
                let enemy;

                if (enemyType < 0.7) {
                    // Basic enemy
                    enemy = {
                        x: Math.random() * (canvas.width - 30),
                        y: -30,
                        width: 30,
                        height: 30,
                        speed: 1 + Math.random() * 2,
                        health: 1,
                        color: '#ff8844',
                        points: 10
                    };
                } else if (enemyType < 0.9) {
                    // Fast enemy
                    enemy = {
                        x: Math.random() * (canvas.width - 25),
                        y: -25,
                        width: 25,
                        height: 25,
                        speed: 3 + Math.random() * 2,
                        health: 1,
                        color: '#44ff44',
                        points: 20
                    };
                } else {
                    // Heavy enemy
                    enemy = {
                        x: Math.random() * (canvas.width - 40),
                        y: -40,
                        width: 40,
                        height: 40,
                        speed: 0.5 + Math.random(),
                        health: 3,
                        maxHealth: 3,
                        color: '#ff4444',
                        points: 50
                    };
                }

                gameState.current.enemies.push(enemy);
                gameState.current.enemySpawnTimer = 0;
            }

            // Update enemies
            gameState.current.enemies = gameState.current.enemies.filter(enemy => {
                enemy.y += enemy.speed;

                // Draw enemy
                ctx.fillStyle = enemy.color;
                ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

                // Draw health bar for heavy enemies
                if (enemy.maxHealth > 1) {
                    const healthRatio = enemy.health / enemy.maxHealth;
                    ctx.fillStyle = '#ff0000';
                    ctx.fillRect(enemy.x, enemy.y - 8, enemy.width, 3);
                    ctx.fillStyle = '#00ff00';
                    ctx.fillRect(enemy.x, enemy.y - 8, enemy.width * healthRatio, 3);
                }

                // Check collision with player
                if (enemy.x < gameState.current.player.x + gameState.current.player.width &&
                    enemy.x + enemy.width > gameState.current.player.x &&
                    enemy.y < gameState.current.player.y + gameState.current.player.height &&
                    enemy.y + enemy.height > gameState.current.player.y) {

                    setHealth(prev => {
                        const newHealth = prev - 20;
                        if (newHealth <= 0) {
                            setGameOver(true);
                        }
                        return Math.max(0, newHealth);
                    });

                    // Create explosion particles
                    for (let i = 0; i < 10; i++) {
                        gameState.current.particles.push({
                            x: enemy.x + enemy.width / 2,
                            y: enemy.y + enemy.height / 2,
                            vx: (Math.random() - 0.5) * 8,
                            vy: (Math.random() - 0.5) * 8,
                            life: 30,
                            color: '#ff4444'
                        });
                    }

                    return false; // Remove enemy
                }

                return enemy.y < canvas.height + enemy.height;
            });

            // Check bullet-enemy collisions
            gameState.current.bullets.forEach((bullet, bulletIndex) => {
                gameState.current.enemies.forEach((enemy, enemyIndex) => {
                    if (bullet.x < enemy.x + enemy.width &&
                        bullet.x + bullet.width > enemy.x &&
                        bullet.y < enemy.y + enemy.height &&
                        bullet.y + bullet.height > enemy.y) {

                        enemy.health--;
                        gameState.current.bullets.splice(bulletIndex, 1);

                        // Create hit particles
                        for (let i = 0; i < 5; i++) {
                            gameState.current.particles.push({
                                x: enemy.x + enemy.width / 2,
                                y: enemy.y + enemy.height / 2,
                                vx: (Math.random() - 0.5) * 4,
                                vy: (Math.random() - 0.5) * 4,
                                life: 20,
                                color: enemy.color
                            });
                        }

                        if (enemy.health <= 0) {
                            setScore(prev => prev + enemy.points);
                            gameState.current.enemies.splice(enemyIndex, 1);

                            // Create explosion particles
                            for (let i = 0; i < 12; i++) {
                                gameState.current.particles.push({
                                    x: enemy.x + enemy.width / 2,
                                    y: enemy.y + enemy.height / 2,
                                    vx: (Math.random() - 0.5) * 6,
                                    vy: (Math.random() - 0.5) * 6,
                                    life: 25,
                                    color: '#ffffff'
                                });
                            }
                        }
                    }
                });
            });

            // Spawn power-ups
            gameState.current.powerUpSpawnTimer++;
            if (gameState.current.powerUpSpawnTimer > 600) {
                const powerUpTypes = ['health', 'ammo'];
                const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];

                gameState.current.powerUps.push({
                    x: Math.random() * (canvas.width - 20),
                    y: -20,
                    width: 20,
                    height: 20,
                    speed: 2,
                    type: type,
                    color: type === 'health' ? '#00ff00' : '#0088ff',
                    rotation: 0
                });
                gameState.current.powerUpSpawnTimer = 0;
            }

            // Update power-ups
            gameState.current.powerUps = gameState.current.powerUps.filter(powerUp => {
                powerUp.y += powerUp.speed;
                powerUp.rotation += 0.1;

                // Draw rotating power-up
                ctx.save();
                ctx.translate(powerUp.x + powerUp.width/2, powerUp.y + powerUp.height/2);
                ctx.rotate(powerUp.rotation);
                ctx.fillStyle = powerUp.color;
                ctx.fillRect(-powerUp.width/2, -powerUp.height/2, powerUp.width, powerUp.height);
                ctx.restore();

                // Check collision with player
                if (powerUp.x < gameState.current.player.x + gameState.current.player.width &&
                    powerUp.x + powerUp.width > gameState.current.player.x &&
                    powerUp.y < gameState.current.player.y + gameState.current.player.height &&
                    powerUp.y + powerUp.height > gameState.current.player.y) {

                    if (powerUp.type === 'health') {
                        setHealth(prev => Math.min(100, prev + 25));
                    } else if (powerUp.type === 'ammo') {
                        setAmmo(prev => Math.min(100, prev + 20));
                    }

                    // Create pickup particles
                    for (let i = 0; i < 8; i++) {
                        gameState.current.particles.push({
                            x: powerUp.x + powerUp.width / 2,
                            y: powerUp.y + powerUp.height / 2,
                            vx: (Math.random() - 0.5) * 4,
                            vy: (Math.random() - 0.5) * 4,
                            life: 15,
                            color: powerUp.color
                        });
                    }

                    return false;
                }

                return powerUp.y < canvas.height + powerUp.height;
            });

            // Update particles
            gameState.current.particles = gameState.current.particles.filter(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life--;
                particle.vx *= 0.98;
                particle.vy *= 0.98;

                const alpha = particle.life / 30;
                ctx.globalAlpha = alpha;
                ctx.fillStyle = particle.color;
                ctx.fillRect(particle.x, particle.y, 2, 2);
                ctx.globalAlpha = 1;

                return particle.life > 0;
            });

            // Level up
            if (score > level * 300) {
                setLevel(prev => prev + 1);
            }

            // Draw UI
            ctx.fillStyle = '#ffffff';
            ctx.font = '18px Arial';
            ctx.fillText(`Score: ${score}`, 10, 25);
            ctx.fillText(`Level: ${level}`, 10, 50);

            // Health bar
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(10, 60, 100, 10);
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(10, 60, health, 10);
            ctx.fillText(`Health: ${health}`, 120, 69);

            // Ammo bar
            ctx.fillStyle = '#333333';
            ctx.fillRect(10, 80, 100, 10);
            ctx.fillStyle = '#0088ff';
            ctx.fillRect(10, 80, ammo, 10);
            ctx.fillText(`Ammo: ${ammo}`, 120, 89);

            animationFrameId.current = requestAnimationFrame(gameLoop);
        };

        gameLoop();

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [gameStarted, gameOver, ammo, level, score, health]);

    const handleStart = () => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        setLevel(1);
        setHealth(100);
        setAmmo(50);
        // Reset game state
        gameState.current = {
            player: { x: 275, y: 350, width: 50, height: 30 },
            bullets: [],
            enemies: [],
            particles: [],
            powerUps: [],
            stars: [],
            keys: {},
            lastShot: 0,
            enemySpawnTimer: 0,
            powerUpSpawnTimer: 0
        };
    };

    const handleRestart = () => {
        handleStart();
    };

    if (!gameStarted) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '1rem',
                color: '#fff',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    🚀 SPACE DEFENDER 🚀
                </h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                    Defend Earth from alien invasion!
                </p>
                <div style={{ marginBottom: '2rem', textAlign: 'left', fontSize: '1rem' }}>
                    <h3>Controls:</h3>
                    <p>• <strong>Mouse:</strong> Move ship & Click to shoot</p>
                    <p>• <strong>WASD/Arrow Keys:</strong> Move ship</p>
                    <p>• <strong>Spacebar:</strong> Shoot</p>
                    <br />
                    <h3>Power-ups:</h3>
                    <p>• 🟢 <strong>Green:</strong> Health boost (+25)</p>
                    <p>• 🔵 <strong>Blue:</strong> Ammo refill (+20)</p>
                    <br />
                    <h3>Enemies:</h3>
                    <p>• 🟠 <strong>Orange:</strong> Basic (10 pts)</p>
                    <p>• 🟢 <strong>Green:</strong> Fast (20 pts)</p>
                    <p>• 🔴 <strong>Red:</strong> Heavy (50 pts, 3 hits)</p>
                </div>
                <button
                    onClick={handleStart}
                    style={{
                        padding: '1rem 2rem',
                        fontSize: '1.2rem',
                        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '2rem',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                    }}
                >
                    Start Mission
                </button>
            </div>
        );
    }

    if (gameOver) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
                borderRadius: '1rem',
                color: '#fff',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>GAME OVER</h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Mission Failed!</p>
                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Final Score: <strong>{score}</strong></p>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Level Reached: <strong>{level}</strong></p>
                <button
                    onClick={handleRestart}
                    style={{
                        padding: '1rem 2rem',
                        fontSize: '1.2rem',
                        background: 'linear-gradient(45deg, #00bcd4, #0097a7)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '2rem',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                        marginRight: '1rem'
                    }}
                >
                    Try Again
                </button>
                <button
                    onClick={() => setGameStarted(false)}
                    style={{
                        padding: '1rem 2rem',
                        fontSize: '1.2rem',
                        background: 'linear-gradient(45deg, #666666, #333333)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '2rem',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                    }}
                >
                    Main Menu
                </button>
            </div>
        );
    }

    return (
        <div style={{
            textAlign: 'center',
            padding: '1rem',
            background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%)',
            borderRadius: '1rem',
            color: '#fff',
            maxWidth: '640px',
            margin: '0 auto'
        }}>
            <h2 style={{
                color: '#00bcd4',
                marginBottom: '1rem',
                fontSize: '1.8rem'
            }}>
                🚀 SPACE DEFENDER 🚀
            </h2>
            <canvas
                ref={canvasRef}
                style={{
                    background: '#0a0a2e',
                    borderRadius: '0.5rem',
                    display: 'block',
                    margin: '0 auto',
                    border: '2px solid #00bcd4',
                    cursor: 'crosshair'
                }}
            />
            <div style={{ marginTop: '1rem' }}>
                <button
                    onClick={handleRestart}
                    style={{
                        padding: '0.5rem 1rem',
                        background: 'linear-gradient(45deg, #00bcd4, #0097a7)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        marginRight: '1rem',
                        fontWeight: 'bold'
                    }}
                >
                    Restart
                </button>
                <button
                    onClick={() => setGameOver(true)}
                    style={{
                        padding: '0.5rem 1rem',
                        background: 'linear-gradient(45deg, #ff4444, #cc0000)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    End Game
                </button>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#aaa' }}>
                Use mouse to move, click or spacebar to shoot. Collect power-ups to survive!
            </p>
        </div>
    );
};

export default SpaceShooter;