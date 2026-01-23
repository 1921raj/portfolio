import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import {
    Github,
    Linkedin,
    Mail,
    Code2,
    Award,
    Briefcase,
    Terminal,
    ChevronDown,
    Menu,
    X,
    FileText
} from 'lucide-react';

export function MobileView() {
    const { data } = usePortfolio();
    const { name, title, social } = data.personal;

    const [activeSection, setActiveSection] = useState('hero');
    const [menuOpen, setMenuOpen] = useState(false);

    const sections = ['hero', 'projects', 'skills', 'experience', 'contact'];

    const scrollToSection = (section) => {
        setActiveSection(section);
        setMenuOpen(false);
        const element = document.getElementById(`mobile-${section}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)',
            color: 'white',
            overflowX: 'hidden',
            overflowY: 'auto',
            position: 'relative'
        }}>
            {/* Simplified particle background for mobile */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `
          radial-gradient(circle at 20% 30%, rgba(0, 240, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(136, 0, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.1) 0%, transparent 50%)
        `,
                pointerEvents: 'none',
                zIndex: 0
            }} />

            {/* Mobile Navigation */}
            <motion.nav
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(0, 240, 255, 0.2)',
                    zIndex: 100,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
            >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--color-primary-cyan)' }}>
                    {name.split(' ')[0].toUpperCase()}
                </div>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '0.5rem'
                    }}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </motion.nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <motion.div
                    style={{
                        position: 'fixed',
                        top: '60px',
                        left: 0,
                        right: 0,
                        background: 'rgba(0, 0, 0, 0.95)',
                        backdropFilter: 'blur(20px)',
                        padding: '2rem',
                        zIndex: 99,
                        borderBottom: '1px solid rgba(0, 240, 255, 0.2)'
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {sections.map((section) => (
                        <motion.button
                            key={section}
                            onClick={() => scrollToSection(section)}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '1rem',
                                background: activeSection === section ? 'rgba(0, 240, 255, 0.1)' : 'none',
                                border: activeSection === section ? '1px solid var(--color-primary-cyan)' : 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '1rem',
                                textAlign: 'left',
                                textTransform: 'capitalize',
                                marginBottom: '0.5rem',
                                cursor: 'pointer'
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {section}
                        </motion.button>
                    ))}
                </motion.div>
            )}

            {/* Content Sections */}
            <div style={{ paddingTop: '80px', position: 'relative', zIndex: 1 }}>
                {/* Hero Section */}
                <section id="mobile-hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Terminal size={48} style={{ color: 'var(--color-primary-cyan)', marginBottom: '1rem' }} />
                        <h1 style={{
                            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                            fontFamily: 'var(--font-mono)',
                            background: 'linear-gradient(135deg, #00f0ff, #0066ff, #8800ff)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '1rem'
                        }}>
                            {name}
                        </h1>
                        <p style={{
                            fontSize: '0.9rem',
                            color: 'var(--color-primary-cyan)',
                            fontFamily: 'var(--font-mono)',
                            letterSpacing: '0.1em',
                            marginBottom: '1.5rem'
                        }}>
                            {title.toUpperCase()}
                        </p>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'rgba(255, 255, 255, 0.8)',
                            lineHeight: 1.8,
                            marginBottom: '2rem'
                        }}>
                            {data.personal.tagline}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <a href={social?.github} style={{
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, #00f0ff, #0066ff)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                textDecoration: 'none',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.9rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <Github size={18} /> GitHub
                            </a>
                            <a href={social?.linkedin} style={{
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, #0066ff, #8800ff)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                textDecoration: 'none',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.9rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <Linkedin size={18} /> LinkedIn
                            </a>
                        </div>
                        <motion.div
                            style={{ marginTop: '3rem', textAlign: 'center' }}
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <ChevronDown size={32} style={{ color: 'var(--color-primary-cyan)', opacity: 0.6 }} />
                        </motion.div>
                    </motion.div>
                </section>

                {/* Projects Section */}
                <section id="mobile-projects" style={{ minHeight: '100vh', padding: '3rem 1.5rem' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <Code2 size={32} style={{ color: 'var(--color-primary-cyan)' }} />
                            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)' }}>Projects</h2>
                        </div>

                        {data.projects.map((project, i) => (
                            <motion.div
                                key={i}
                                style={{
                                    padding: '1.5rem',
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '12px',
                                    border: `1px solid ${project.color}40`,
                                    marginBottom: '1.5rem'
                                }}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: project.color }}>
                                    {project.title}
                                </h3>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {project.technologies.map((tech) => (
                                        <span key={tech} style={{
                                            padding: '0.25rem 0.75rem',
                                            background: `${project.color}20`,
                                            border: `1px solid ${project.color}40`,
                                            borderRadius: '6px',
                                            fontSize: '0.85rem',
                                            fontFamily: 'var(--font-mono)'
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Skills Section */}
                <section id="mobile-skills" style={{ minHeight: '100vh', padding: '3rem 1.5rem' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <Award size={32} style={{ color: 'var(--color-primary-cyan)' }} />
                            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)' }}>Skills</h2>
                        </div>

                        {data.skills.categories.map((category, i) => (
                            <motion.div
                                key={i}
                                style={{ marginBottom: '2rem' }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <h3 style={{
                                    fontSize: '1.2rem',
                                    color: category.color,
                                    marginBottom: '1rem',
                                    fontFamily: 'var(--font-mono)'
                                }}>
                                    {category.name}
                                </h3>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {category.skills.map((skill) => (
                                        <span key={skill.name} style={{
                                            padding: '0.5rem 1rem',
                                            background: `${category.color}20`,
                                            border: `1px solid ${category.color}40`,
                                            borderRadius: '8px',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.9rem'
                                        }}>
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Experience Section */}
                <section id="mobile-experience" style={{ minHeight: '100vh', padding: '3rem 1.5rem' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <Briefcase size={32} style={{ color: 'var(--color-primary-cyan)' }} />
                            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)' }}>Experience</h2>
                        </div>

                        {data.experience.map((exp, i) => (
                            <motion.div
                                key={i}
                                style={{
                                    padding: '1.5rem',
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '12px',
                                    border: `1px solid ${exp.color}40`,
                                    marginBottom: '1.5rem',
                                    position: 'relative',
                                    paddingLeft: '2.5rem'
                                }}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '1.5rem',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: exp.color,
                                    boxShadow: `0 0 10px ${exp.color}`
                                }} />
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{exp.title}</h3>
                                <div style={{ fontSize: '0.9rem', color: exp.color, marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                                    {exp.company}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                                    {exp.period}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Contact Section */}
                <section id="mobile-contact" style={{ minHeight: '100vh', padding: '3rem 1.5rem' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <Mail size={32} style={{ color: 'var(--color-primary-cyan)' }} />
                            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)' }}>Contact</h2>
                        </div>

                        <div style={{
                            padding: '2rem',
                            background: 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(0, 240, 255, 0.3)'
                        }}>
                            <p style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                                {data.contact.availability}
                            </p>

                            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem' }}>
                                <a href={social?.github} style={{ color: 'var(--color-primary-cyan)' }}>
                                    <Github size={32} />
                                </a>
                                <a href={social?.linkedin} style={{ color: 'var(--color-primary-cyan)' }}>
                                    <Linkedin size={32} />
                                </a>
                                <a href={`mailto:${social?.email}`} style={{ color: 'var(--color-primary-cyan)' }}>
                                    <Mail size={32} />
                                </a>
                            </div>

                            <a
                                href={`mailto:${social?.email}`}
                                style={{
                                    display: 'block',
                                    marginTop: '2rem',
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, #00f0ff, #0066ff)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '1rem'
                                }}
                            >
                                Send Email
                            </a>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}
