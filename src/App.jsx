import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import {
  ParticleField,
  Grid3D,
  DynamicLighting,
  BackgroundShapes,
  ProfileCube,
  TechCubes,
  SkillCategoryCubes,
  GalleryCubes,
  DataStreams
} from './components/SpaceEnvironment';
import { HeroScene3D } from './components/BlackholeHero';
import { PortfolioProvider } from './context/PortfolioContext';
import AdminPanel from './components/AdminPanel';
import {
  HeroPage,
  ProjectsPage,
  SkillsPage,
  ExperiencePage,
  ContactPage,
  ResumePage
} from './components/Pages';
import { MobileView } from './components/MobileView';
import './index.css';

// Menu Navigation Component with Hover Previews
function MenuNavigation({ currentPage, onNavigate }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      id: 'hero',
      label: 'Home',
      color: '#00f0ff',
      preview: {
        title: 'Raj Kumar',
        subtitle: 'Full-Stack Software Engineer',
        description: 'Crafting futuristic digital experiences'
      }
    },
    {
      id: 'projects',
      label: 'Projects',
      color: '#0066ff',
      preview: {
        title: '4 Featured Projects',
        subtitle: 'From AI to 3D Graphics',
        items: ['AI Chat Assistant', '3D Portfolio', 'E-Commerce', 'Cloud Infrastructure']
      }
    },
    {
      id: 'skills',
      label: 'Skills',
      color: '#8800ff',
      preview: {
        title: 'Technical Expertise',
        subtitle: '20+ Technologies',
        items: ['React • Three.js • TypeScript', 'Node.js • Python • GraphQL', 'AWS • Docker • Kubernetes']
      }
    },
    {
      id: 'experience',
      label: 'Experience',
      color: '#ff00aa',
      preview: {
        title: '6+ Years Experience',
        subtitle: '3 Major Companies',
        items: ['TechCorp Innovation Labs', 'Digital Solutions Inc.', 'Creative Web Studio']
      }
    },
    {
      id: 'resume',
      label: 'Resume',
      color: '#00ff88',
      preview: {
        title: 'Curriculum Vitae',
        subtitle: 'Professional Summary',
        description: 'View and download my detailed resume'
      }
    },
    {
      id: 'contact',
      label: 'Contact',
      color: '#ffd700',
      preview: {
        title: 'Get In Touch',
        subtitle: 'Let\'s collaborate',
        description: 'Available for freelance projects and full-time opportunities'
      }
    },
  ];

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {menuItems.map((item) => (
        <div key={item.id} style={{ position: 'relative' }}>
          <motion.button
            onClick={() => onNavigate(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              background: currentPage === item.id ? `${item.color}20` : 'rgba(0, 0, 0, 0.3)',
              border: `1px solid ${currentPage === item.id || hoveredItem === item.id ? item.color : 'rgba(255, 255, 255, 0.1)'}`,
              borderRadius: '12px',
              color: currentPage === item.id || hoveredItem === item.id ? item.color : 'white',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'left',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 0.3s',
              boxShadow: (currentPage === item.id || hoveredItem === item.id) ? `0 0 20px ${item.color}40` : 'none',
              position: 'relative',
              zIndex: 2
            }}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{item.label}</span>
              {hoveredItem === item.id && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ fontSize: '1.2rem' }}
                >
                  →
                </motion.span>
              )}
            </div>
          </motion.button>

          {/* Hover Preview Popup */}
          <AnimatePresence>
            {hoveredItem === item.id && (
              <motion.div
                style={{
                  position: 'absolute',
                  right: 'calc(100% + 1rem)',
                  top: 0,
                  width: '300px',
                  padding: '1.5rem',
                  background: 'rgba(0, 0, 0, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${item.color}`,
                  borderRadius: '12px',
                  boxShadow: `0 10px 40px ${item.color}40`,
                  zIndex: 1000,
                  pointerEvents: 'none'
                }}
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: item.color,
                  fontFamily: 'var(--font-mono)'
                }}>
                  {item.preview.title}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {item.preview.subtitle}
                </div>
                {item.preview.description && (
                  <p style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)'
                  }}>
                    {item.preview.description}
                  </p>
                )}
                {item.preview.items && (
                  <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.75rem' }}>
                    {item.preview.items.map((previewItem, i) => (
                      <div key={i} style={{
                        fontSize: '0.85rem',
                        color: 'var(--color-text-secondary)',
                        paddingLeft: '1rem',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          top: '0.4rem',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: item.color
                        }} />
                        {previewItem}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function AppContent() {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentPage, setCurrentPage] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const pages = ['hero', 'projects', 'skills', 'experience', 'resume', 'contact'];

    const handleKeyPress = (e) => {
      const currentIndex = pages.indexOf(currentPage);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const nextIndex = (currentIndex + 1) % pages.length;
        setCurrentPage(pages[nextIndex]);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prevIndex = (currentIndex - 1 + pages.length) % pages.length;
        setCurrentPage(pages[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage]);

  const navigateToPage = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  // If mobile, show simplified view
  if (isMobile) {
    return <MobileView />;
  }

  // Desktop full-page experience
  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="loading-spinner" />
              <motion.p
                className="caption"
                style={{ marginTop: '2rem', textAlign: 'center' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Initializing Digital Space...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Canvas Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 80]} fov={75} />
          <Suspense fallback={null}>
            {currentPage === 'hero' ? (
              <HeroScene3D />
            ) : (
              <>
                <DynamicLighting mousePosition={mousePosition} />
                <ParticleField count={3000} mousePosition={mousePosition} />
                <Grid3D mousePosition={mousePosition} />
                <BackgroundShapes />
                <DataStreams />

                {(currentPage === 'projects' || currentPage === 'skills') && <TechCubes />}
                {currentPage === 'skills' && <SkillCategoryCubes />}
                {currentPage === 'resume' && <TechCubes />}
                {currentPage === 'contact' && <ProfileCube />}
              </>
            )}
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            rotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Burger Menu Button */}
      <motion.button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          zIndex: 1000,
          width: '50px',
          height: '50px',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--color-primary-cyan)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--color-primary-cyan)',
          boxShadow: menuOpen ? '0 0 20px var(--color-primary-cyan)' : 'none'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Right-Side Sliding Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(5px)',
                zIndex: 998,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Right sidebar menu */}
            <motion.div
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: 'min(450px, 90vw)',
                height: '100%',
                background: 'rgba(5, 5, 16, 0.95)',
                backdropFilter: 'blur(20px)',
                borderLeft: '1px solid var(--color-primary-cyan)',
                boxShadow: '-10px 0 50px rgba(0, 240, 255, 0.3)',
                zIndex: 999,
                overflowY: 'auto',
                padding: '2rem',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Menu Header */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.5rem',
                  color: 'var(--color-primary-cyan)',
                  marginBottom: '0.5rem'
                }}>
                  NAVIGATION
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  Hover to preview • Click to navigate
                </p>
              </div>

              {/* Navigation Items with Hover Preview */}
              <MenuNavigation
                currentPage={currentPage}
                onNavigate={navigateToPage}
              />

              {/* Contact Section in Menu */}
              <div style={{
                marginTop: '3rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(0, 240, 255, 0.2)'
              }}>
                <h4 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  color: 'var(--color-primary-cyan)',
                  marginBottom: '1.5rem',
                  letterSpacing: '0.1em'
                }}>
                  GET IN TOUCH
                </h4>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  <a
                    href="mailto:raj@example.com"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem',
                      background: 'rgba(0, 240, 255, 0.1)',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 240, 255, 0.2)';
                      e.currentTarget.style.borderColor = 'var(--color-primary-cyan)';
                      e.currentTarget.style.transform = 'translateX(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <Mail size={20} style={{ color: 'var(--color-primary-cyan)' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>Email</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>raj@example.com</div>
                    </div>
                  </a>

                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem',
                      background: 'rgba(0, 102, 255, 0.1)',
                      border: '1px solid rgba(0, 102, 255, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 102, 255, 0.2)';
                      e.currentTarget.style.borderColor = '#0066ff';
                      e.currentTarget.style.transform = 'translateX(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 102, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(0, 102, 255, 0.3)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <Github size={20} style={{ color: '#0066ff' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>GitHub</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>@rajkumar</div>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem',
                      background: 'rgba(136, 0, 255, 0.1)',
                      border: '1px solid rgba(136, 0, 255, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(136, 0, 255, 0.2)';
                      e.currentTarget.style.borderColor = '#8800ff';
                      e.currentTarget.style.transform = 'translateX(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(136, 0, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(136, 0, 255, 0.3)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <Linkedin size={20} style={{ color: '#8800ff' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>LinkedIn</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>/in/rajkumar</div>
                    </div>
                  </a>
                </div>

                <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  <p>💼 Available for freelance projects</p>
                  <p>🚀 Open to collaboration</p>
                  <p>⚡ Response time: 24-48 hours</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page Indicator */}
      <motion.div
        style={{
          position: 'fixed',
          top: '2rem',
          left: '2rem',
          zIndex: 100,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="caption" style={{ color: 'var(--color-primary-cyan)', marginBottom: '0.5rem' }}>
          CURRENT PAGE
        </div>
        <motion.h2
          className="heading-2"
          key={currentPage}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontSize: '1.5rem', textTransform: 'capitalize' }}
        >
          {currentPage}
        </motion.h2>
      </motion.div>

      {/* Full-Page Content Container */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        <AnimatePresence mode="wait">
          {currentPage === 'hero' && (
            <HeroPage key="hero" onNavigate={setCurrentPage} />
          )}

          {currentPage === 'projects' && (
            <ProjectsPage key="projects" />
          )}

          {currentPage === 'skills' && (
            <SkillsPage key="skills" />
          )}

          {currentPage === 'experience' && (
            <ExperiencePage key="experience" />
          )}

          {currentPage === 'resume' && (
            <ResumePage key="resume" />
          )}

          {currentPage === 'contact' && (
            <ContactPage key="contact" />
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Hint */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '1rem 2rem',
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          border: '1px solid rgba(0, 240, 255, 0.2)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span className="caption">Press ☰ Menu</span>
        <span className="caption">← → Arrow Keys</span>
        <span className="caption">Scroll to Explore</span>
      </motion.div>
      <AdminPanel />
    </>
  );
}

// Main App Wrapper with Context Provider
export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
