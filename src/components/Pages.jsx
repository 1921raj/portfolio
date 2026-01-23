import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText, AddItemButton, DeleteItemButton } from './Editable';
import {
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Code2,
    Rocket,
    Briefcase,
    Award,
    Terminal,
    Cpu,
    Database,
    Cloud,
    Sparkles,
    ChevronDown,
    Send,
    FileText
} from 'lucide-react';
import resumePdf from './RAJKAMAL.pdf';

// Page transition variants
const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, staggerChildren: 0.1 }
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.4 } }
};

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

// Icon mapper helper
const IconMap = ({ iconName, ...props }) => {
    switch (iconName?.toLowerCase()) {
        case 'cpu': return <Cpu {...props} />;
        case 'rocket': return <Rocket {...props} />;
        case 'database': return <Database {...props} />;
        case 'cloud': return <Cloud {...props} />;
        case 'terminal': return <Terminal {...props} />;
        default: return <Code2 {...props} />;
    }
};

// Hero Page Component
export function HeroPage({ onNavigate }) {
    const { data } = usePortfolio();
    const { profileImage, name, title, subtitle, tagline, social } = data.personal;
    const [imgError, setImgError] = useState(false);

    return (
        <motion.div
            className="page-container"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
            }}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
                <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    {!imgError && profileImage ? (
                        <div style={{
                            width: '180px',
                            height: '180px',
                            borderRadius: '50%',
                            border: '2px solid var(--color-primary-cyan)',
                            boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)',
                            overflow: 'hidden',
                            position: 'relative',
                            background: 'rgba(0,0,0,0.5)'
                        }}>
                            <img
                                src={profileImage}
                                alt="Profile"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={() => setImgError(true)}
                            />
                        </div>
                    ) : (
                        <Sparkles className="glow-cyan" size={60} strokeWidth={1.5} />
                    )}
                </motion.div>

                <motion.h1
                    className="heading-1"
                    style={{ marginBottom: '1rem' }}
                    variants={itemVariants}
                >
                    <EditableText path="personal.name" content={name} tagName="span" />
                </motion.h1>

                <motion.div
                    className="caption"
                    style={{
                        color: 'var(--color-primary-cyan)',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '1.2rem'
                    }}
                    variants={itemVariants}
                >
                    <Terminal size={20} />
                    <EditableText path="personal.title" content={title.toUpperCase()} tagName="span" />
                    {" · "}
                    <EditableText path="personal.subtitle" content={subtitle.toUpperCase()} tagName="span" />
                </motion.div>

                <motion.p
                    className="body-large"
                    style={{
                        marginBottom: '3rem',
                        maxWidth: '800px',
                        margin: '0 auto 3rem',
                        fontSize: '1.3rem',
                        lineHeight: 1.8
                    }}
                    variants={itemVariants}
                >
                    <EditableText path="personal.tagline" content={tagline} tagName="span" />
                </motion.p>

                <motion.div
                    style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}
                    variants={itemVariants}
                >
                    <a href={social?.github || "#"} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                        <Github size={24} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                        GitHub
                    </a>
                    <a href={social?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                        <Linkedin size={24} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                        LinkedIn
                    </a>
                    <button
                        onClick={() => onNavigate('resume')}
                        className="btn-primary"
                        style={{ fontSize: '1.1rem', padding: '1rem 2rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                        <FileText size={24} style={{ marginRight: '0.5rem' }} />
                        Resume
                    </button>
                    <a href={`mailto:${social?.email}`} className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                        <Mail size={24} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                        Contact Me
                    </a>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onNavigate?.('projects')}
                >
                    <ChevronDown size={40} style={{ color: 'var(--color-primary-cyan)', opacity: 0.7 }} />
                    <p className="caption" style={{ marginTop: '0.5rem' }}>Explore My Work</p>
                </motion.div>
            </div>
        </motion.div>
    );
}

// Projects Page Component
export function ProjectsPage() {
    const { data } = usePortfolio();
    const projects = data.projects || [];

    const projectTemplate = {
        title: "New Project Title",
        description: "Project description goes here...",
        technologies: ["React", "Node.js"],
        color: "#00f0ff",
        icon: "code",
        github: "#",
        liveDemo: "#",
        highlights: ["Feature 1", "Feature 2"]
    };

    return (
        <motion.div
            className="page-container"
            style={{
                minHeight: '100vh',
                padding: '6rem 2rem 4rem',
            }}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <motion.div
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', justifyContent: 'space-between' }}
                    variants={itemVariants}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Code2 className="glow-blue" size={48} />
                        <h2 className="heading-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Featured Projects</h2>
                    </div>
                    <AddItemButton path="projects" template={projectTemplate} label="Add Project" />
                </motion.div>

                <div style={{ display: 'grid', gap: '2rem' }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id || index}
                            className="glass-card"
                            style={{
                                padding: '2.5rem',
                                borderColor: `${project.color}60`,
                                position: 'relative'
                            }}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, borderColor: project.color }}
                        >
                            <DeleteItemButton path="projects" index={index} />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                                        <div style={{
                                            padding: '1rem',
                                            background: `${project.color}20`,
                                            borderRadius: '16px',
                                            color: project.color
                                        }}>
                                            <IconMap iconName={project.icon} />
                                        </div>
                                        <div>
                                            <h3 className="heading-3" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                                                <EditableText path={`projects.${index}.title`} content={project.title} />
                                            </h3>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                {project.github && (
                                                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: project.color, display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                                        <Github size={18} /> GitHub
                                                    </a>
                                                )}
                                                {project.liveDemo && (
                                                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" style={{ color: project.color, display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                                        <ExternalLink size={18} /> Live Demo
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="body-text" style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                                        <EditableText path={`projects.${index}.description`} content={project.description} tagName="span" />
                                    </p>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <h4 style={{ fontSize: '0.9rem', color: project.color, marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>KEY FEATURES</h4>
                                        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.5rem' }}>
                                            {(project.highlights || []).map((highlight, i) => (
                                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: project.color }} />
                                                    <EditableText path={`projects.${index}.highlights.${i}`} content={highlight} />
                                                </li>
                                            ))}
                                            <AddItemButton path={`projects.${index}.highlights`} template="New Highlight" label="Add Highlight" />
                                        </ul>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                        {(project.technologies || []).map((tech, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    background: `${project.color}15`,
                                                    border: `1px solid ${project.color}40`,
                                                    borderRadius: '8px',
                                                    fontSize: '0.95rem',
                                                    color: project.color,
                                                    fontFamily: 'var(--font-mono)',
                                                }}
                                            >
                                                <EditableText path={`projects.${index}.technologies.${i}`} content={tech} />
                                            </span>
                                        ))}
                                        <AddItemButton path={`projects.${index}.technologies`} template="New Tech" label="+" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// Skills Page Component  
export function SkillsPage() {
    const { data } = usePortfolio();
    const skillCategories = data.skills?.categories || [];

    const categoryTemplate = {
        name: "New Category",
        color: "#00f0ff",
        icon: "💻",
        skills: [
            { name: "Skill Name", level: 80, description: "Description here" }
        ]
    };

    const skillTemplate = { name: "New Skill", level: 80, description: "Description here" };

    return (
        <motion.div
            className="page-container"
            style={{
                minHeight: '100vh',
                padding: '6rem 2rem 4rem',
            }}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <motion.div
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', justifyContent: 'space-between' }}
                    variants={itemVariants}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Award className="glow-violet" size={48} />
                        <h2 className="heading-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Technical Skills</h2>
                    </div>
                    <AddItemButton path="skills.categories" template={categoryTemplate} label="Add Category" />
                </motion.div>

                <div style={{ display: 'grid', gap: '3rem' }}>
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            className="glass-card"
                            style={{
                                padding: '2.5rem',
                                borderColor: `${category.color}60`,
                                position: 'relative'
                            }}
                            variants={itemVariants}
                            whileHover={{ borderColor: category.color }}
                        >
                            <DeleteItemButton path="skills.categories" index={catIndex} />

                            <h3
                                className="heading-3"
                                style={{
                                    fontSize: '1.8rem',
                                    marginBottom: '2rem',
                                    color: category.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}
                            >
                                <span style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: category.color,
                                    boxShadow: `0 0 20px ${category.color}`
                                }} />
                                <EditableText path={`skills.categories.${catIndex}.name`} content={category.name} />
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                                {(category.skills || []).map((skill, skillIndex) => (
                                    <motion.div
                                        key={skillIndex}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                                        style={{ position: 'relative' }}
                                    >
                                        <DeleteItemButton path={`skills.categories.${catIndex}.skills`} index={skillIndex} />
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '0.75rem',
                                            alignItems: 'baseline'
                                        }}>
                                            <span style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '1.1rem',
                                                fontWeight: 600
                                            }}>
                                                <EditableText path={`skills.categories.${catIndex}.skills.${skillIndex}.name`} content={skill.name} />
                                            </span>
                                            <span style={{
                                                color: category.color,
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '1rem',
                                                fontWeight: 600
                                            }}>
                                                <EditableText path={`skills.categories.${catIndex}.skills.${skillIndex}.level`} content={skill.level.toString()} />%
                                            </span>
                                        </div>
                                        <p style={{
                                            fontSize: '0.9rem',
                                            color: 'var(--color-text-muted)',
                                            marginBottom: '0.75rem'
                                        }}>
                                            <EditableText path={`skills.categories.${catIndex}.skills.${skillIndex}.description`} content={skill.description} />
                                        </p>
                                        <div style={{
                                            width: '100%',
                                            height: '8px',
                                            background: 'rgba(0, 0, 0, 0.3)',
                                            borderRadius: '4px',
                                            overflow: 'hidden',
                                            position: 'relative'
                                        }}>
                                            <motion.div
                                                style={{
                                                    height: '100%',
                                                    background: `linear-gradient(90deg, ${category.color}, ${category.color}cc)`,
                                                    borderRadius: '4px',
                                                    boxShadow: `0 0 15px ${category.color}80`
                                                }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: catIndex * 0.1 + skillIndex * 0.05 + 0.3 }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                                <AddItemButton path={`skills.categories.${catIndex}.skills`} template={skillTemplate} label="Add Skill" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// Experience Page Component
export function ExperiencePage() {
    const { data } = usePortfolio();
    const experiences = data.experience || [];
    const education = data.education || [];

    const expTemplate = {
        title: "New Role",
        company: "Company Name",
        location: "Location",
        period: "Period",
        color: "#00f0ff",
        achievements: ["Achievement 1"],
        technologies: ["React"]
    };

    const eduTemplate = {
        degree: "New Degree",
        institution: "Institution Name",
        location: "Location",
        period: "Period",
        color: "#00f0ff",
        details: ["Detail 1"]
    };

    return (
        <motion.div
            className="page-container"
            style={{
                minHeight: '100vh',
                padding: '6rem 2rem 4rem',
            }}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <motion.div
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', justifyContent: 'space-between' }}
                    variants={itemVariants}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Briefcase className="glow-cyan" size={48} />
                        <h2 className="heading-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Professional Experience</h2>
                    </div>
                    <AddItemButton path="experience" template={expTemplate} label="Add Experience" />
                </motion.div>

                <div style={{ display: 'grid', gap: '2.5rem', position: 'relative' }}>
                    {/* Timeline line */}
                    <div style={{
                        position: 'absolute',
                        left: 'calc(2.5rem + 8px)',
                        top: '3rem',
                        bottom: '3rem',
                        width: '2px',
                        background: 'linear-gradient(180deg, #00f0ff, #0066ff, #8800ff)',
                        opacity: 0.5,
                        zIndex: 0
                    }} />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="glass-card"
                            style={{
                                position: 'relative',
                                paddingLeft: '5rem',
                                padding: '2.5rem 2.5rem 2.5rem 5rem',
                                borderColor: `${exp.color}60`
                            }}
                            variants={itemVariants}
                            whileHover={{ borderColor: exp.color, scale: 1.01 }}
                        >
                            <DeleteItemButton path="experience" index={index} />

                            <div style={{
                                position: 'absolute',
                                left: '2.5rem',
                                top: '3rem',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                background: exp.color,
                                boxShadow: `0 0 25px ${exp.color}`,
                                border: '4px solid rgba(0, 0, 0, 0.8)',
                                zIndex: 1
                            }} />

                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div>
                                    <h3 className="heading-3" style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>
                                        <EditableText path={`experience.${index}.title`} content={exp.title} />
                                    </h3>
                                    <div style={{
                                        display: 'flex',
                                        gap: '2rem',
                                        marginBottom: '0.5rem',
                                        flexWrap: 'wrap',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{
                                            color: exp.color,
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '1.1rem',
                                            fontWeight: 600
                                        }}>
                                            <EditableText path={`experience.${index}.company`} content={exp.company} />
                                        </span>
                                        <span className="caption" style={{ fontSize: '1rem' }}>
                                            📍 <EditableText path={`experience.${index}.location`} content={exp.location} />
                                        </span>
                                        <span className="caption" style={{ fontSize: '1rem' }}>
                                            📅 <EditableText path={`experience.${index}.period`} content={exp.period} />
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h4 style={{
                                        fontSize: '0.9rem',
                                        color: exp.color,
                                        marginBottom: '1rem',
                                        fontFamily: 'var(--font-mono)',
                                        letterSpacing: '0.1em'
                                    }}>
                                        KEY ACHIEVEMENTS
                                    </h4>
                                    <ul style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        display: 'grid',
                                        gap: '1rem'
                                    }}>
                                        {(exp.achievements || []).map((achievement, i) => (
                                            <li
                                                key={i}
                                                className="body-text"
                                                style={{
                                                    paddingLeft: '1.5rem',
                                                    position: 'relative',
                                                    lineHeight: 1.7,
                                                    fontSize: '1.05rem'
                                                }}
                                            >
                                                <span style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: '0.6rem',
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    background: exp.color,
                                                    boxShadow: `0 0 10px ${exp.color}`
                                                }} />
                                                <EditableText path={`experience.${index}.achievements.${i}`} content={achievement} />
                                                <DeleteItemButton path={`experience.${index}.achievements`} index={i} />
                                            </li>
                                        ))}
                                        <AddItemButton path={`experience.${index}.achievements`} template="New Achievement" label="Add Achievement" />
                                    </ul>
                                </div>

                                <div>
                                    <h4 style={{
                                        fontSize: '0.9rem',
                                        color: exp.color,
                                        marginBottom: '1rem',
                                        fontFamily: 'var(--font-mono)',
                                        letterSpacing: '0.1em'
                                    }}>
                                        TECHNOLOGIES USED
                                    </h4>
                                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                        {(exp.technologies || []).map((tech, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    background: `${exp.color}15`,
                                                    border: `1px solid ${exp.color}40`,
                                                    borderRadius: '8px',
                                                    fontSize: '0.95rem',
                                                    color: exp.color,
                                                    fontFamily: 'var(--font-mono)',
                                                    position: 'relative'
                                                }}
                                            >
                                                <EditableText path={`experience.${index}.technologies.${i}`} content={tech} />
                                                <DeleteItemButton path={`experience.${index}.technologies`} index={i} />
                                            </span>
                                        ))}
                                        <AddItemButton path={`experience.${index}.technologies`} template="New Tech" label="+" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Education Section */}
                <div style={{ marginTop: '6rem' }}>
                    <motion.div
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', justifyContent: 'space-between' }}
                        variants={itemVariants}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Award className="glow-violet" size={48} />
                            <h2 className="heading-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Education</h2>
                        </div>
                        <AddItemButton path="education" template={eduTemplate} label="Add Education" />
                    </motion.div>

                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                className="glass-card"
                                style={{
                                    padding: '2.5rem',
                                    borderColor: `${edu.color}60`,
                                    position: 'relative'
                                }}
                                variants={itemVariants}
                                whileHover={{ borderColor: edu.color, scale: 1.01 }}
                            >
                                <DeleteItemButton path="education" index={index} />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
                                    <div>
                                        <h3 className="heading-3" style={{ fontSize: '1.8rem', marginBottom: '0.75rem', color: edu.color }}>
                                            <EditableText path={`education.${index}.degree`} content={edu.degree} />
                                        </h3>
                                        <div style={{
                                            display: 'flex',
                                            gap: '2rem',
                                            marginBottom: '1.5rem',
                                            flexWrap: 'wrap',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                fontFamily: 'var(--font-mono)'
                                            }}>
                                                <EditableText path={`education.${index}.institution`} content={edu.institution} />
                                            </span>
                                            <span className="caption" style={{ fontSize: '1rem' }}>
                                                📍 <EditableText path={`education.${index}.location`} content={edu.location} />
                                            </span>
                                            <span className="caption" style={{ fontSize: '1rem' }}>
                                                📅 <EditableText path={`education.${index}.period`} content={edu.period} />
                                            </span>
                                        </div>

                                        <ul style={{
                                            listStyle: 'none',
                                            padding: 0,
                                            display: 'grid',
                                            gap: '0.75rem'
                                        }}>
                                            {(edu.details || []).map((detail, i) => (
                                                <li
                                                    key={i}
                                                    className="body-text"
                                                    style={{
                                                        paddingLeft: '1.5rem',
                                                        position: 'relative',
                                                        lineHeight: 1.7,
                                                        fontSize: '1.05rem'
                                                    }}
                                                >
                                                    <span style={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        top: '0.6rem',
                                                        width: '6px',
                                                        height: '6px',
                                                        borderRadius: '50%',
                                                        background: edu.color,
                                                        boxShadow: `0 0 10px ${edu.color}`
                                                    }} />
                                                    <EditableText path={`education.${index}.details.${i}`} content={detail} />
                                                    <DeleteItemButton path={`education.${index}.details`} index={i} />
                                                </li>
                                            ))}
                                            <AddItemButton path={`education.${index}.details`} template="New Detail" label="Add Detail" />
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Resume Page Component
export function ResumePage() {
    return (
        <motion.div
            className="page-container"
            style={{
                minHeight: '100vh',
                padding: '6rem 2rem 4rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div style={{ maxWidth: '1200px', width: '100%', height: '80vh', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <motion.div
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}
                    variants={itemVariants}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <FileText className="glow-cyan" size={48} />
                        <h2 className="heading-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Resume</h2>
                    </div>
                    <a
                        href={resumePdf}
                        download="RAJKAMAL_Resume.pdf"
                        className="btn-primary"
                        style={{ fontSize: '1.1rem', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <ChevronDown size={24} />
                        Download PDF
                    </a>
                </motion.div>

                <motion.div
                    className="glass-card"
                    style={{
                        flex: 1,
                        padding: '1rem',
                        borderColor: 'var(--color-primary-cyan)',
                        overflow: 'hidden'
                    }}
                    variants={itemVariants}
                >
                    <object
                        data={resumePdf}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        style={{
                            borderRadius: '8px',
                            background: 'white'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: 'white',
                            gap: '1rem'
                        }}>
                            <p className="body-large">Unable to display PDF directly in your browser.</p>
                            <a
                                href={resumePdf}
                                download="RAJKAMAL_Resume.pdf"
                                className="btn-primary"
                            >
                                Download PDF instead
                            </a>
                        </div>
                    </object>
                </motion.div>
            </div>
        </motion.div>
    );
}

// Contact Page Component
export function ContactPage() {
    const { data } = usePortfolio();
    const contact = data.contact || {};
    const { social } = data.personal;

    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formState);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <motion.div
            className="page-container"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6rem 2rem 4rem',
            }}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div style={{ maxWidth: '800px', width: '100%' }}>
                <motion.div
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}
                    variants={itemVariants}
                >
                    <Mail className="glow-cyan" size={48} />
                    <h2 className="heading-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Get In Touch</h2>
                </motion.div>

                <motion.p
                    className="body-large"
                    style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.2rem' }}
                    variants={itemVariants}
                >
                    <EditableText path="contact.availability" content={contact.availability || "Have a project in mind or want to collaborate? I'd love to hear from you!"} tagName="span" />
                </motion.p>

                <motion.form
                    onSubmit={handleSubmit}
                    className="glass-card"
                    style={{ padding: '3rem', borderColor: 'rgba(0, 240, 255, 0.6)' }}
                    variants={itemVariants}
                >
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.75rem',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '1rem',
                                color: 'var(--color-primary-cyan)'
                            }}>
                                Your Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1.5rem',
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    border: '1px solid rgba(0, 240, 255, 0.3)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '1.1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--color-primary-cyan)';
                                    e.target.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.75rem',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '1rem',
                                color: 'var(--color-primary-cyan)'
                            }}>
                                Email Address *
                            </label>
                            <input
                                type="email"
                                required
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1.5rem',
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    border: '1px solid rgba(0, 240, 255, 0.3)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '1.1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--color-primary-cyan)';
                                    e.target.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.75rem',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '1rem',
                                color: 'var(--color-primary-cyan)'
                            }}>
                                Message *
                            </label>
                            <textarea
                                required
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                rows={6}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1.5rem',
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    border: '1px solid rgba(0, 240, 255, 0.3)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '1.1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s',
                                    resize: 'vertical',
                                    minHeight: '150px'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--color-primary-cyan)';
                                    e.target.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            style={{
                                width: '100%',
                                fontSize: '1.2rem',
                                padding: '1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem'
                            }}
                        >
                            <Send size={24} />
                            {submitted ? 'Message Sent!' : 'Send Message'}
                        </button>
                    </div>
                </motion.form>

                <motion.div
                    style={{
                        marginTop: '3rem',
                        display: 'flex',
                        gap: '2rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}
                    variants={itemVariants}
                >
                    <motion.a
                        href={social?.github || "https://github.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, color: 'var(--color-primary-cyan)' }}
                        style={{
                            color: 'var(--color-text-secondary)',
                            transition: 'all 0.3s',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                            textDecoration: 'none'
                        }}
                    >
                        <Github size={36} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>GitHub</span>
                    </motion.a>
                    <motion.a
                        href={social?.linkedin || "https://linkedin.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, color: 'var(--color-primary-cyan)' }}
                        style={{
                            color: 'var(--color-text-secondary)',
                            transition: 'all 0.3s',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                            textDecoration: 'none'
                        }}
                    >
                        <Linkedin size={36} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>LinkedIn</span>
                    </motion.a>
                    <motion.a
                        href={`mailto:${social?.email}`}
                        whileHover={{ scale: 1.2, color: 'var(--color-primary-cyan)' }}
                        style={{
                            color: 'var(--color-text-secondary)',
                            transition: 'all 0.3s',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                            textDecoration: 'none'
                        }}
                    >
                        <Mail size={36} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>Email</span>
                    </motion.a>
                </motion.div>
            </div>
        </motion.div>
    );
}
