import { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Edit3, Check, X, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function EditableText({ path, content, tagName = 'span', className = '', style = {} }) {
    const { isEditMode, updateData } = usePortfolio();
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(content);
    const Tag = tagName;

    useEffect(() => {
        setValue(content);
    }, [content]);

    if (!isEditMode) {
        return <Tag className={className} style={style}>{content}</Tag>;
    }

    const handleSave = () => {
        updateData(path, value);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setValue(content);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className={`editable-container ${className}`} style={{ ...style, position: 'relative', display: 'inline-block', width: '100%' }}>
                {tagName === 'textarea' || content.length > 50 ? (
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        autoFocus
                        style={{
                            width: '100%',
                            background: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            border: '1px solid var(--color-primary-cyan)',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            minHeight: '100px',
                            fontFamily: 'inherit',
                            fontSize: 'inherit'
                        }}
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        autoFocus
                        style={{
                            width: '100%',
                            background: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            border: '1px solid var(--color-primary-cyan)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontFamily: 'inherit',
                            fontSize: 'inherit'
                        }}
                    />
                )}
                <div style={{ position: 'absolute', top: '-30px', right: 0, display: 'flex', gap: '5px', zIndex: 10 }}>
                    <button onClick={handleSave} style={{ background: '#00cc00', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer', padding: '2px' }}><Check size={16} /></button>
                    <button onClick={handleCancel} style={{ background: '#cc0000', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer', padding: '2px' }}><X size={16} /></button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`editable-hover ${className}`}
            onClick={() => setIsEditing(true)}
            style={{
                ...style,
                position: 'relative',
                cursor: 'pointer',
                border: '1px dashed transparent',
                transition: 'border 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary-cyan)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
        >
            <Tag>{content}</Tag>
            <Edit3 size={14} style={{ position: 'absolute', top: '-15px', right: '-15px', color: 'var(--color-primary-cyan)', opacity: 0.7 }} />
        </div>
    );
}

export function AddItemButton({ path, template, label = "Add Item" }) {
    const { isEditMode, addSection } = usePortfolio();

    if (!isEditMode) return null;

    return (
        <motion.button
            onClick={() => addSection(path, template)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px dashed var(--color-primary-cyan)',
                color: 'var(--color-primary-cyan)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                margin: '1rem 0'
            }}
        >
            <Plus size={18} /> {label.toUpperCase()}
        </motion.button>
    );
}

export function DeleteItemButton({ path, index }) {
    const { isEditMode, deleteItem } = usePortfolio();

    if (!isEditMode) return null;

    return (
        <button
            onClick={() => {
                if (window.confirm('Delete this item?')) {
                    deleteItem(path, index);
                }
            }}
            style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255, 0, 0, 0.2)',
                border: '1px solid rgba(255, 0, 0, 0.4)',
                color: '#ff4444',
                padding: '0.4rem',
                borderRadius: '6px',
                cursor: 'pointer',
                zIndex: 5
            }}
            title="Delete Item"
        >
            <Trash2 size={16} />
        </button>
    );
}
