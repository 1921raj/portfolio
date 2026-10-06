import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Settings, Lock, Unlock, LogOut, Save, RefreshCw } from 'lucide-react';

const MotionDiv = motion.div;

export default function AdminPanel() {
    const {
        isAdmin,
        isEditMode,
        login,
        logout,
        toggleEditMode,
        resetToDefaults
    } = usePortfolio();

    const [password, setPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            const success = await login(password);
            if (success) {
                setPassword('');
            } else {
                setLoginError('Access Denied');
            }
        } catch (error) {
            setLoginError(error.message);
        }
    };

    const handleLogout = async () => {
        setLoginError('');
        try {
            await logout();
        } catch (error) {
            setLoginError(error.message);
        }
    };

    return (
        <>
            {/* Toggle Button (Hidden/Subtle) */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '1rem',
                    left: '1rem',
                    zIndex: 2000,
                }}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid var(--color-primary-cyan)',
                        color: 'var(--color-primary-cyan)',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Settings size={20} />
                </button>
            </div>

            {/* Admin Modal/Panel */}
            <AnimatePresence>
                {isOpen && (
                    <MotionDiv
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        style={{
                            position: 'fixed',
                            bottom: '4rem',
                            left: '1rem',
                            width: '300px',
                            background: 'rgba(5, 5, 16, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid var(--color-primary-cyan)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            zIndex: 2000,
                            boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ color: 'var(--color-primary-cyan)', margin: 0, fontFamily: 'var(--font-mono)' }}>
                                SYSTEM ADMIN
                            </h3>
                            {isAdmin && (
                                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}>
                                    <LogOut size={18} />
                                </button>
                            )}
                        </div>

                        {!isAdmin ? (
                            <form onSubmit={handleLogin}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>ACCESS CODE</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter admin password..."
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            background: 'rgba(0,0,0,0.3)',
                                            border: loginError ? '1px solid #ff4444' : '1px solid rgba(255,255,255,0.2)',
                                            color: 'white',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    {loginError && <span style={{ color: '#ff4444', fontSize: '0.7rem' }}>{loginError}</span>}
                                </div>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    AUTHENTICATE
                                </button>
                            </form>
                        ) : (
                            <div>
                                {loginError && <div style={{ color: '#ff4444', fontSize: '0.8rem', marginBottom: '0.75rem' }}>{loginError}</div>}
                                <div style={{ marginBottom: '1rem', padding: '0.5rem', background: 'rgba(0,255,0,0.1)', border: '1px solid #00ff00', borderRadius: '4px', fontSize: '0.8rem', color: '#00ff00', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <Unlock size={14} /> ACCESS GRANTED
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        cursor: 'pointer',
                                        padding: '0.75rem',
                                        background: isEditMode ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                                        border: `1px solid ${isEditMode ? 'var(--color-primary-cyan)' : 'rgba(255,255,255,0.1)'}`,
                                        borderRadius: '8px',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={isEditMode}
                                            onChange={toggleEditMode}
                                            style={{ width: '18px', height: '18px' }}
                                        />
                                        <span style={{ fontSize: '1rem', fontWeight: 600 }}>Enable Live Edit Mode</span>
                                    </label>

                                    <div style={{
                                        padding: '1rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '8px',
                                        fontSize: '0.85rem',
                                        lineHeight: 1.5,
                                        color: 'var(--color-text-muted)',
                                        marginBottom: '1rem'
                                    }}>
                                        <div style={{ color: 'var(--color-primary-cyan)', fontWeight: 600, marginBottom: '0.5rem' }}>HOW TO USE:</div>
                                        <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                            <li>Click on any text to edit it</li>
                                            <li>Use + buttons to add items</li>
                                            <li>Use Trash icons to remove items</li>
                                            <li>Changes save automatically</li>
                                        </ul>
                                    </div>

                                    <hr style={{ width: '100%', borderColor: 'rgba(255,255,255,0.1)', margin: '0.5rem 0' }} />

                                    <button
                                        onClick={resetToDefaults}
                                        style={{
                                            marginTop: '0.5rem',
                                            background: 'rgba(255,0,0,0.1)',
                                            border: '1px solid rgba(255,0,0,0.3)',
                                            color: '#ff4444',
                                            padding: '0.6rem',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,0,0,0.2)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,0,0,0.1)'}
                                    >
                                        <RefreshCw size={14} /> FACTORY RESET SYSTEM
                                    </button>
                                </div>
                            </div>
                        )}
                    </MotionDiv>
                )}
            </AnimatePresence>
        </>
    );
}
