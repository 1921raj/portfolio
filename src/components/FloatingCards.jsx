import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Code2,
    Rocket,
    Briefcase,
    GraduationCap,
    Award,
    Terminal,
    Cpu,
    Database,
    Cloud,
    Sparkles
} from 'lucide-react';

// Hero Card Component
export function HeroCard({ onHover, isActive, onClick }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * 10, y: -x * 10 });
        onHover?.();
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={cardRef}
            className="glass-card gpu-accelerated"
            style={{
                position: 'absolute',
                width: 'min(600px, 90vw)',
                padding: 'clamp(2rem, 5vw, 4rem)',
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.3s ease-out',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, z: 50 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <Sparkles className="glow-cyan" size={40} strokeWidth={1.5} />
            </motion.div>

            <motion.h1
                className="heading-1"
                style={{ marginTop: '1rem', marginBottom: '0.5rem' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                Raj Kumar
            </motion.h1>

            <motion.div
                className="caption"
                style={{
                    color: 'var(--color-primary-cyan)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Terminal size={16} />
                FULL-STACK SOFTWARE ENGINEER
            </motion.div>

            <motion.p
                className="body-large"
                style={{ marginBottom: '2rem', lineHeight: 1.8 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                Crafting futuristic digital experiences with cutting-edge technology.
                Specializing in <span style={{ color: 'var(--color-primary-cyan)' }}>React</span>,
                <span style={{ color: 'var(--color-primary-cyan)' }}> Three.js</span>, and
                <span style={{ color: 'var(--color-primary-cyan)' }}> AI Integration</span>.
            </motion.p>

            <motion.div
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <Github size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                    GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <Linkedin size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                    LinkedIn
                </a>
                <a href="mailto:raj@example.com" className="btn-primary">
                    <Mail size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                    Contact
                </a>
            </motion.div>
        </motion.div>
    );
}

// Projects Card Component
export function ProjectsCard({ onHover, isActive, onClick }) {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 1,
            title: "AI Chat Assistant",
            description: "Real-time streaming AI chatbot with WebSocket integration and GPT-4 support",
            tech: ["React", "Node.js", "OpenAI", "WebSocket"],
            color: "#00f0ff",
            icon: <Cpu />,
            link: "#"
        },
        {
            id: 2,
            title: "3D Portfolio Experience",
            description: "Immersive portfolio website with Three.js and React Three Fiber",
            tech: ["React", "Three.js", "GSAP", "Framer Motion"],
            color: "#0066ff",
            icon: <Rocket />,
            link: "#"
        },
        {
            id: 3,
            title: "E-Commerce Platform",
            description: "Full-stack e-commerce solution with real-time inventory management",
            tech: ["Next.js", "MongoDB", "Stripe", "Tailwind"],
            color: "#8800ff",
            icon: <Database />,
            link: "#"
        },
        {
            id: 4,
            title: "Cloud Infrastructure",
            description: "Scalable microservices architecture on AWS with Docker & Kubernetes",
            tech: ["AWS", "Docker", "Kubernetes", "Terraform"],
            color: "#ff00aa",
            icon: <Cloud />,
            link: "#"
        },
    ];

    return (
        <motion.div
            className="glass-card gpu-accelerated"
            style={{
                position: 'absolute',
                width: 'min(700px, 90vw)',
                padding: 'clamp(2rem, 4vw, 3rem)',
                maxHeight: '80vh',
                overflowY: 'auto',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, z: 30 }}
            onClick={onClick}
            onMouseEnter={onHover}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Code2 className="glow-blue" size={32} />
                <h2 className="heading-2">Featured Projects</h2>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        style={{
                            padding: '1.5rem',
                            background: 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '16px',
                            border: `1px solid ${project.color}40`,
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                            scale: 1.05,
                            borderColor: project.color,
                            boxShadow: `0 0 30px ${project.color}60`
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            <div style={{
                                padding: '0.75rem',
                                background: `${project.color}20`,
                                borderRadius: '12px',
                                color: project.color
                            }}>
                                {project.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <h3 className="heading-3" style={{ fontSize: '1.25rem' }}>{project.title}</h3>
                                    <ExternalLink size={16} style={{ color: project.color }} />
                                </div>
                                <p className="body-text" style={{ marginBottom: '1rem' }}>
                                    {project.description}
                                </p>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            style={{
                                                padding: '0.25rem 0.75rem',
                                                background: `${project.color}15`,
                                                border: `1px solid ${project.color}40`,
                                                borderRadius: '8px',
                                                fontSize: '0.875rem',
                                                color: project.color,
                                                fontFamily: 'var(--font-mono)',
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// Skills Card Component
export function SkillsCard({ onHover, isActive, onClick }) {
    const skillCategories = [
        {
            category: "Frontend",
            color: "#00f0ff",
            skills: [
                { name: "React.js", level: 95 },
                { name: "Three.js", level: 88 },
                { name: "TypeScript", level: 92 },
                { name: "Next.js", level: 90 },
                { name: "Framer Motion", level: 85 },
            ]
        },
        {
            category: "Backend",
            color: "#0066ff",
            skills: [
                { name: "Node.js", level: 93 },
                { name: "Python", level: 87 },
                { name: "GraphQL", level: 84 },
                { name: "PostgreSQL", level: 89 },
                { name: "Redis", level: 82 },
            ]
        },
        {
            category: "DevOps & Cloud",
            color: "#8800ff",
            skills: [
                { name: "AWS", level: 86 },
                { name: "Docker", level: 91 },
                { name: "Kubernetes", level: 79 },
                { name: "CI/CD", level: 88 },
                { name: "Terraform", level: 75 },
            ]
        },
        {
            category: "AI & ML",
            color: "#ff00aa",
            skills: [
                { name: "OpenAI API", level: 90 },
                { name: "LangChain", level: 85 },
                { name: "TensorFlow", level: 78 },
                { name: "Vector DBs", level: 83 },
                { name: "RAG Systems", level: 87 },
            ]
        },
    ];

    return (
        <motion.div
            className="glass-card gpu-accelerated"
            style={{
                position: 'absolute',
                width: 'min(650px, 90vw)',
                padding: 'clamp(2rem, 4vw, 3rem)',
                maxHeight: '80vh',
                overflowY: 'auto',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, z: 30 }}
            onClick={onClick}
            onMouseEnter={onHover}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Award className="glow-violet" size={32} />
                <h2 className="heading-2">Technical Skills</h2>
            </div>

            <div style={{ display: 'grid', gap: '2rem' }}>
                {skillCategories.map((category, catIndex) => (
                    <motion.div
                        key={category.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIndex * 0.1 }}
                    >
                        <h3
                            className="heading-3"
                            style={{
                                fontSize: '1.2rem',
                                marginBottom: '1rem',
                                color: category.color,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <span style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: category.color,
                                boxShadow: `0 0 10px ${category.color}`
                            }} />
                            {category.category}
                        </h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {category.skills.map((skill, skillIndex) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '0.5rem',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.9rem'
                                    }}>
                                        <span>{skill.name}</span>
                                        <span style={{ color: category.color }}>{skill.level}%</span>
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        height: '6px',
                                        background: 'rgba(0, 0, 0, 0.3)',
                                        borderRadius: '3px',
                                        overflow: 'hidden',
                                        position: 'relative'
                                    }}>
                                        <motion.div
                                            style={{
                                                height: '100%',
                                                background: `linear-gradient(90deg, ${category.color}, ${category.color}cc)`,
                                                borderRadius: '3px',
                                                boxShadow: `0 0 10px ${category.color}80`
                                            }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1, delay: catIndex * 0.1 + skillIndex * 0.05 + 0.3 }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// Experience Card Component
export function ExperienceCard({ onHover, isActive, onClick }) {
    const experiences = [
        {
            title: "Senior Full-Stack Developer",
            company: "TechCorp Innovation Labs",
            period: "2022 - Present",
            color: "#00f0ff",
            achievements: [
                "Led development of AI-powered analytics platform serving 100K+ users",
                "Architected microservices infrastructure reducing latency by 60%",
                "Mentored 5 junior developers on React and system design best practices"
            ]
        },
        {
            title: "Software Engineer",
            company: "Digital Solutions Inc.",
            period: "2020 - 2022",
            color: "#0066ff",
            achievements: [
                "Built real-time collaboration tools with WebSocket and React",
                "Optimized database queries improving response time by 45%",
                "Implemented CI/CD pipelines reducing deployment time by 70%"
            ]
        },
        {
            title: "Frontend Developer",
            company: "Creative Web Studio",
            period: "2018 - 2020",
            color: "#8800ff",
            achievements: [
                "Developed 20+ responsive web applications with React and Vue",
                "Created reusable component library adopted across 10+ projects",
                "Improved website performance scores to 95+ on Lighthouse"
            ]
        }
    ];

    return (
        <motion.div
            className="glass-card gpu-accelerated"
            style={{
                position: 'absolute',
                width: 'min(700px, 90vw)',
                padding: 'clamp(2rem, 4vw, 3rem)',
                maxHeight: '80vh',
                overflowY: 'auto',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, z: 30 }}
            onClick={onClick}
            onMouseEnter={onHover}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Briefcase className="glow-cyan" size={32} />
                <h2 className="heading-2">Experience</h2>
            </div>

            <div style={{ display: 'grid', gap: '2rem', position: 'relative' }}>
                {/* Timeline line */}
                <div style={{
                    position: 'absolute',
                    left: '1.5rem',
                    top: '2rem',
                    bottom: '2rem',
                    width: '2px',
                    background: 'linear-gradient(180deg, #00f0ff, #0066ff, #8800ff)',
                    opacity: 0.5
                }} />

                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        style={{ position: 'relative', paddingLeft: '3.5rem' }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                    >
                        {/* Timeline dot */}
                        <div style={{
                            position: 'absolute',
                            left: '0.75rem',
                            top: '0.5rem',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: exp.color,
                            boxShadow: `0 0 20px ${exp.color}`,
                            border: '3px solid rgba(0, 0, 0, 0.5)'
                        }} />

                        <div style={{
                            padding: '1.5rem',
                            background: 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '16px',
                            border: `1px solid ${exp.color}40`,
                        }}>
                            <h3 className="heading-3" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                                {exp.title}
                            </h3>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '1rem',
                                flexWrap: 'wrap',
                                gap: '0.5rem'
                            }}>
                                <span style={{ color: exp.color, fontFamily: 'var(--font-mono)' }}>
                                    {exp.company}
                                </span>
                                <span className="caption">{exp.period}</span>
                            </div>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                display: 'grid',
                                gap: '0.75rem'
                            }}>
                                {exp.achievements.map((achievement, i) => (
                                    <motion.li
                                        key={i}
                                        className="body-text"
                                        style={{
                                            paddingLeft: '1.5rem',
                                            position: 'relative',
                                            lineHeight: 1.6
                                        }}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.2 + i * 0.1 }}
                                    >
                                        <span style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: '0.5rem',
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            background: exp.color
                                        }} />
                                        {achievement}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// Contact Card Component
export function ContactCard({ onHover, isActive, onClick }) {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formState);
        alert('Message sent! (Demo only)');
    };

    return (
        <motion.div
            className="glass-card gpu-accelerated"
            style={{
                position: 'absolute',
                width: 'min(500px, 90vw)',
                padding: 'clamp(2rem, 4vw, 3rem)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, z: 30 }}
            onClick={onClick}
            onMouseEnter={onHover}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Mail className="glow-cyan" size={32} />
                <h2 className="heading-2">Get In Touch</h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                        Name
                    </label>
                    <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            background: 'rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(0, 240, 255, 0.3)',
                            borderRadius: '12px',
                            color: 'white',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'all 0.3s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-cyan)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(0, 240, 255, 0.3)'}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                        Email
                    </label>
                    <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            background: 'rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(0, 240, 255, 0.3)',
                            borderRadius: '12px',
                            color: 'white',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'all 0.3s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-cyan)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(0, 240, 255, 0.3)'}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                        Message
                    </label>
                    <textarea
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        rows={5}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            background: 'rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(0, 240, 255, 0.3)',
                            borderRadius: '12px',
                            color: 'white',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'all 0.3s',
                            resize: 'vertical'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-cyan)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(0, 240, 255, 0.3)'}
                    />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    Send Message
                </button>
            </form>

            <div style={{
                marginTop: '2rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(0, 240, 255, 0.2)',
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center'
            }}>
                <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: 'var(--color-primary-cyan)' }}
                    style={{ color: 'var(--color-text-secondary)', transition: 'all 0.3s' }}
                >
                    <Github size={24} />
                </motion.a>
                <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: 'var(--color-primary-cyan)' }}
                    style={{ color: 'var(--color-text-secondary)', transition: 'all 0.3s' }}
                >
                    <Linkedin size={24} />
                </motion.a>
                <motion.a
                    href="mailto:raj@example.com"
                    whileHover={{ scale: 1.2, color: 'var(--color-primary-cyan)' }}
                    style={{ color: 'var(--color-text-secondary)', transition: 'all 0.3s' }}
                >
                    <Mail size={24} />
                </motion.a>
            </div>
        </motion.div>
    );
}
